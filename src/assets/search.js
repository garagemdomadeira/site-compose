/**
 * Funcionalidade de busca do site
 * Este arquivo contém toda a lógica de busca e exibição dos resultados
 */

document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const searchResults = document.getElementById('searchResults');
    let searchIndex = null;

    // Função para obter parâmetros da URL
    function getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        const results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }

    // Preenche o input com o parâmetro q da URL
    const searchQuery = getUrlParameter('q');
    if (searchQuery) {
        searchInput.value = searchQuery;
        // Realiza a pesquisa automaticamente se houver um termo na URL
        setTimeout(() => performSearch(), 100);
    }

    // Carrega o índice de pesquisa
    fetch('/search-index.json')
        .then(response => response.json())
        .then(data => {
            searchIndex = data;
            // Se houver um termo na URL, realiza a pesquisa após carregar o índice
            if (searchQuery) {
                performSearch();
            }
        })
        .catch(error => {
            console.error('Erro ao carregar índice de pesquisa:', error);
            searchResults.innerHTML = '<div class="alert alert-danger">Erro ao carregar índice de pesquisa</div>';
        });

    // Função para limpar o texto de pesquisa
    function cleanSearchText(text) {
        return text
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9\s]/g, '')
            .trim();
    }

    // Função para realizar a pesquisa
    function performSearch() {
        const searchText = cleanSearchText(searchInput.value);
        if (!searchText || !searchIndex) return;

        // Atualiza a URL com o termo de pesquisa
        const newUrl = new URL(window.location.href);
        newUrl.searchParams.set('q', searchText);
        window.history.pushState({}, '', newUrl);

        const results = [];
        const searchWords = searchText.split(/\s+/);

        searchIndex.forEach(([url, title, image, words]) => {
            let score = 0;
            let matchedWords = new Set();

            // Procura por correspondências em cada grupo de palavras
            Object.entries(words).forEach(([wordScore, wordList]) => {
                const wordArray = wordList.split('|');
                searchWords.forEach(searchWord => {
                    if (wordArray.some(word => word.includes(searchWord))) {
                        score += parseInt(wordScore);
                        matchedWords.add(searchWord);
                    }
                });
            });

            // Verifica correspondência no título
            const cleanTitle = cleanSearchText(title);
            searchWords.forEach(word => {
                if (cleanTitle.includes(word)) {
                    score += 10;
                    matchedWords.add(word);
                }
            });

            if (matchedWords.size > 0) {
                // Adiciona 20 pontos extras para cada palavra adicional encontrada
                const extraWordsBonus = (matchedWords.size - 1) * 20;
                results.push({
                    url,
                    title,
                    image,
                    score: score + extraWordsBonus,
                    matchedWords: Array.from(matchedWords)
                });
            }
        });

        // Ordena resultados por pontuação
        results.sort((a, b) => b.score - a.score);

        // Exibe resultados
        displayResults(results);
    }

    // Função para exibir os resultados
    function displayResults(results) {
        if (results.length === 0) {
            searchResults.innerHTML = '<div class="alert alert-info">Nenhum resultado encontrado</div>';
            return;
        }

        const html = results.map(result => `
        <div class="card mb-3">
            <div class="row g-0">
                ${result.image ? `
                <div class="col-md-4">
                    <img src="${result.image}" class="img-fluid rounded-start h-100 object-fit-cover" alt="${result.title}">
                </div>
                ` : ''}
                <div class="col-md-${result.image ? '8' : '12'}">
                    <div class="card-body">
                        <h5 class="card-title">
                            <a href="${result.url}" class="text-decoration-none">${result.title}</a>
                        </h5>
                        <p class="card-text text-muted">
                            Palavras encontradas: ${result.matchedWords.join(', ')}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    `).join('');

        searchResults.innerHTML = html;
    }

    // Eventos
    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}); 
