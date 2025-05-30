import { renderTemplate } from '../services/templateService.js';
import { ensureDirectoryExists } from '../services/directoryService.js';
import { generatePostLink } from '../utils/postLink.js';
import { detectMainImage } from '../utils/postImage.js';
import path from 'path';

function renderCategoryCards(posts) {
    return posts.map(post => `
        <div class="col-md-6 col-lg-3 mb-4">
            <div class="card h-100">
                ${post.mainImage ? `<img src="${post.mainImage}" class="card-img-top" alt="${post.title}">` : ''}
                <div class="card-body">
                    <h5 class="card-title">${post.title}</h5>
                    <p class="card-text text-muted">
                        <small>${new Date(post.date).toLocaleDateString('pt-BR')}</small>
                    </p>
                    <a href="${post.link}" class="btn btn-primary">Ler mais</a>
                </div>
            </div>
        </div>
    `).join('');
}

/**
 * Gera a página de listagem de categorias
 * @param {Array} posts - Lista de posts do blog
 * @returns {Promise<void>}
 */
export async function generateCategoryListPage(posts) {
    try {
        console.log('📁 Gerando página de listagem de categorias...');
        
        // Agrupa posts por categoria
        const categories = {};
        posts.forEach(post => {
            if (post.categories && Array.isArray(post.categories)) {
                post.categories.forEach(category => {
                    if (!categories[category]) {
                        categories[category] = {
                            name: category,
                            posts: []
                        };
                    }
                    // Adiciona link e imagem ao post
                    const postWithLinks = {
                        ...post,
                        link: generatePostLink(post),
                        mainImage: detectMainImage(post)
                    };
                    categories[category].posts.push(postWithLinks);
                });
            }
        });

        // Ordena as categorias por nome e limita a 4 posts por categoria
        const sortedCategories = Object.values(categories)
            .sort((a, b) => a.name.localeCompare(b.name))
            .map(category => ({
                name: category.name,
                posts: category.posts
                    .sort((a, b) => new Date(b.date) - new Date(a.date))
                    .slice(0, 4),
                hasMore: category.posts.length > 4
            }));

        // Gera a página de listagem
        const outputPath = path.join('output', 'categories.html');
        await renderTemplate('category-list.html', outputPath, {
            categories: sortedCategories
        });

        console.log('✅ Página de listagem de categorias gerada com sucesso!');
    } catch (error) {
        console.error('❌ Erro ao gerar página de listagem de categorias:', error);
        throw error;
    }
} 
