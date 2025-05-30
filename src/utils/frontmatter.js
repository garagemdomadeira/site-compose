/**
 * Utilitário para extração de metadados do frontmatter em arquivos Markdown.
 * Este módulo é responsável por processar o cabeçalho YAML dos arquivos Markdown
 * e extrair informações como título, data, tags e outros metadados.
 */

/**
 * Extrai metadados do frontmatter de um arquivo Markdown
 * @param {string} content - Conteúdo completo do arquivo Markdown
 * @returns {Object} Objeto contendo os metadados extraídos e o conteúdo restante
 * @property {Object} metadata - Objeto com os metadados extraídos
 * @property {string} content - Conteúdo do arquivo sem o frontmatter
 */
export function extractFrontmatter(content) {
    const frontmatterRegex = /^---\n([\s\S]*?)\n---/;
    const match = content.match(frontmatterRegex);
    
    if (match) {
        const frontmatter = match[1];
        const metadata = {};
        let currentKey = null;
        let currentValue = [];
        
        console.log('Frontmatter encontrado:', frontmatter);
        
        const lines = frontmatter.split('\n');
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            console.log('Processando linha:', line);
            
            // Ignora linhas vazias
            if (!line.trim()) continue;
            
            // Se a linha começa com espaço, é um item de array
            if (line.startsWith('  - ')) {
                if (currentKey) {
                    const value = line.trim().substring(2).replace(/^["']|["']$/g, '');
                    console.log(`Adicionando valor ao array ${currentKey}:`, value);
                    currentValue.push(value);
                }
                continue;
            }
            
            // Se temos um valor de array pendente, salva-o
            if (currentKey && currentValue.length > 0) {
                console.log(`Salvando array ${currentKey}:`, currentValue);
                metadata[currentKey] = currentValue;
                currentValue = [];
            }
            
            // Processa nova linha de chave-valor
            const [key, ...values] = line.split(':');
            if (key && values.length > 0) {
                currentKey = key.trim();
                const value = values.join(':').trim();
                
                // Se o valor está vazio, provavelmente é um array
                if (!value) {
                    console.log(`Iniciando novo array para ${currentKey}`);
                    currentValue = [];
                } else {
                    console.log(`Salvando valor simples ${currentKey}:`, value);
                    metadata[currentKey] = value.replace(/^["']|["']$/g, '');
                    currentKey = null;
                }
            }
        }
        
        // Salva o último array se houver
        if (currentKey && currentValue.length > 0) {
            console.log(`Salvando último array ${currentKey}:`, currentValue);
            metadata[currentKey] = currentValue;
        }
        
        // Garante que a data está no formato correto
        if (metadata.date) {
            const date = new Date(metadata.date);
            metadata.year = date.getFullYear().toString();
            metadata.month = (date.getMonth() + 1).toString().padStart(2, '0');
        }
        
        console.log('Metadados extraídos:', metadata);
        
        return {
            metadata,
            content: content.slice(match[0].length).trim()
        };
    }
    
    return {
        metadata: {},
        content
    };
} 
