import { renderTemplate } from '../services/templateService.js';
import { ensureDirectoryExists } from '../services/directoryService.js';
import path from 'path';

const defaultImage = '/media/garagem_do_madeira_p.png';

/**
 * Gera páginas para cada tag encontrada nos posts
 * @param {Array} posts - Lista de posts do blog
 * @returns {Promise<void>}
 */
export async function generateTagPages(posts) {
    try {
        console.log('🏷️ Gerando páginas de tags...');
        
        // Agrupa posts por tag
        const postsByTag = {};
        posts.forEach(post => {
            if (post.tags && Array.isArray(post.tags)) {
                post.tags.forEach(tag => {
                    if (!postsByTag[tag]) {
                        postsByTag[tag] = [];
                    }
                    postsByTag[tag].push(post);
                });
            }
        });

        // Cria diretório para tags
        const tagDir = path.join('output', 'tags');
        await ensureDirectoryExists(tagDir);

        // Gera uma página para cada tag
        for (const [tag, tagPosts] of Object.entries(postsByTag)) {
            const outputPath = path.join(tagDir, `${tag.toLowerCase().replace(/\s+/g, '-')}.html`);
            
            await renderTemplate('tag.html', outputPath, {
                tag,
                posts: tagPosts,
                title: `Tag: ${tag}`,
                meta: {
                    descricao: `Posts marcados com a tag: ${tag}. Encontre dicas e análises automotivas relacionadas a ${tag}.`,
                    keywords: `tag, ${tag}, carros, automóveis`,
                    image: defaultImage,
                    type: 'website'
                }
            });
        }

        console.log('✅ Páginas de tags geradas com sucesso!');
    } catch (error) {
        console.error('❌ Erro ao gerar páginas de tags:', error);
        throw error;
    }
} 
