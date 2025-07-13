import { renderTemplate } from '../services/templateService.js';
import { ensureDirectoryExists } from '../services/directoryService.js';
import path from 'path';

/**
 * Gera páginas para cada categoria encontrada nos posts
 * @param {Array} posts - Lista de posts do blog
 * @returns {Promise<void>}
 */
export async function generateCategoryPages(posts) {
    try {
        console.log('📁 Gerando páginas de categorias...');
        console.log('Posts recebidos:', posts.length);
        
        // Agrupa posts por categoria
        const postsByCategory = {};
        posts.forEach(post => {
            console.log('Processando post:', post.title);
            console.log('Categorias do post:', post.categories);
            
            if (post.categories && Array.isArray(post.categories)) {
                post.categories.forEach(category => {
                    if (!postsByCategory[category]) {
                        postsByCategory[category] = [];
                    }
                    postsByCategory[category].push(post);
                });
            }
        });

        console.log('Categorias encontradas:', Object.keys(postsByCategory));

        // Cria diretório para categorias
        const categoryDir = path.join('output', 'categories');
        await ensureDirectoryExists(categoryDir);

        // Gera uma página para cada categoria
        for (const [category, categoryPosts] of Object.entries(postsByCategory)) {
            console.log(`Gerando página para categoria: ${category}`);
            const outputPath = path.join(categoryDir, `${category.toLowerCase().replace(/\s+/g, '-')}.html`);
            
            await renderTemplate('category.html', outputPath, {
                category,
                posts: categoryPosts,
                title: `Categoria: ${category}`,
                meta: {
                    descricao: `Posts na categoria: ${category}. Encontre notícias, dicas e análises automotivas relacionadas a ${category}.`,
                    keywords: `categoria, ${category}, carros, automóveis, notícias automotivas`
                }
            });
        }

        console.log('✅ Páginas de categorias geradas com sucesso!');
    } catch (error) {
        console.error('❌ Erro ao gerar páginas de categorias:', error);
        throw error;
    }
} 
