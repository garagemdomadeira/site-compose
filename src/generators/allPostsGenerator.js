/**
 * Gerador da página que lista todos os posts do site.
 * Este módulo é responsável por gerar a página que mostra todos os posts
 * organizados por ano e mês.
 */

import fs from 'fs/promises';
import path from 'path';
import { outputDir, env, mediaDir } from '../utils/config.js';
import { readMenu } from '../services/fileService.js';
import { readMarkdownFiles } from '../services/contentReader.js';
import { generatePostLink } from '../utils/postLink.js';
import { detectMainImage } from '../utils/postImage.js';

const defaultImage = '/media/garagem_do_madeira_p.png';

/**
 * Gera a página que lista todos os posts
 * @returns {Promise<void>}
 * @throws {Error} Se houver erro durante a geração da página
 */
export async function generateAllPostsPage() {
    try {
        // Lê o menu e os posts
        const [menu, posts] = await Promise.all([
            readMenu(),
            readMarkdownFiles()
        ]);

        // Adiciona o campo link e mainImage em cada post
        const postsWithLinks = posts.map(post => ({
            ...post,
            link: generatePostLink(post),
            mainImage: detectMainImage(post)
        }));

        // Organiza os posts por ano e mês
        const postsByYear = postsWithLinks.reduce((acc, post) => {
            const date = new Date(post.date);
            const year = date.getFullYear();
            const month = date.getMonth();

            if (!acc[year]) {
                acc[year] = {};
            }
            if (!acc[year][month]) {
                acc[year][month] = [];
            }

            acc[year][month].push(post);
            return acc;
        }, {});

        // Ordena os anos e meses em ordem decrescente
        const sortedYears = Object.keys(postsByYear).sort((a, b) => b - a);
        const months = [
            'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
            'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
        ];

        // Renderiza o template com os dados
        const html = env.render('all-posts.html', {
            menu,
            postsByYear,
            sortedYears,
            months,
            title: 'Todos os Posts',
            meta: {
                descricao: 'Explore todos os posts do Garagem do Madeira, organizados por ano e mês.',
                keywords: 'todos os posts, arquivo, blog, Garagem do Madeira, notícias automotivas',
                image: defaultImage,
                type: 'website'
            }
        });

        // Salva o arquivo
        await fs.writeFile(path.join(outputDir, 'all-posts.html'), html);
        console.log('✅ Página de todos os posts gerada com sucesso');
    } catch (error) {
        console.error('❌ Erro ao gerar página de todos os posts:', error);
        throw error;
    }
} 
