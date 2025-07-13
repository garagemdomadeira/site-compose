import { renderTemplate } from '../services/templateService.js';
import { ensureDirectoryExists } from '../services/directoryService.js';
import { generatePostLink } from '../utils/postLink.js';
import { detectMainImage } from '../utils/postImage.js';
import path from 'path';

const defaultImage = '/media/garagem_do_madeira_p.png';

/**
 * Gera a página de listagem de tags
 * @param {Array} posts - Lista de posts do blog
 * @returns {Promise<void>}
 */
export async function generateTagListPage(posts) {
    try {
        console.log('🏷️ Gerando página de listagem de tags...');
        
        // Agrupa posts por tag
        const tags = {};
        posts.forEach(post => {
            if (post.tags && Array.isArray(post.tags)) {
                post.tags.forEach(tag => {
                    if (!tags[tag]) {
                        tags[tag] = {
                            name: tag,
                            posts: []
                        };
                    }
                    // Adiciona link e imagem ao post
                    const postWithLinks = {
                        ...post,
                        link: generatePostLink(post),
                        mainImage: detectMainImage(post)
                    };
                    tags[tag].posts.push(postWithLinks);
                });
            }
        });

        // Ordena as tags por nome e limita a 4 posts por tag
        const sortedTags = Object.values(tags)
            .sort((a, b) => a.name.localeCompare(b.name))
            .map(tag => ({
                name: tag.name,
                posts: tag.posts
                    .sort((a, b) => new Date(b.date) - new Date(a.date))
                    .slice(0, 4),
                hasMore: tag.posts.length > 4
            }));

        // Gera a página de listagem
        const outputPath = path.join('output', 'tags.html');
        await renderTemplate('tag-list.html', outputPath, {
            tags: sortedTags,
            title: 'Todas as Tags',
            meta: {
                descricao: 'Explore todas as tags de posts do Garagem do Madeira. Encontre o que você procura por palavras-chave automotivas.',
                keywords: 'tags, palavras-chave, blog, Garagem do Madeira, notícias automotivas',
                image: defaultImage,
                type: 'website'
            }
        });

        console.log('✅ Página de listagem de tags gerada com sucesso!');
    } catch (error) {
        console.error('❌ Erro ao gerar página de listagem de tags:', error);
        throw error;
    }
} 
