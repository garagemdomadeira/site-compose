/**
 * Gerador de páginas de conteúdo do site.
 * Este módulo é responsável por gerar as páginas individuais de conteúdo,
 * processando os arquivos Markdown e criando a estrutura de diretórios
 * organizada por ano/mês.
 */

import fs from 'fs/promises';
import path from 'path';
import { outputDir, env } from '../utils/config.js';
import { readMarkdownFiles, readMenu } from '../services/fileService.js';
import { copyPostImages } from '../utils/media.js';

/**
 * Gera as páginas de conteúdo do site
 * @returns {Promise<void>}
 * @throws {Error} Se houver erro durante a geração das páginas
 */
export async function generateContentPages() {
    try {
        const posts = await readMarkdownFiles();
        const menu = await readMenu();

        for (const post of posts) {
            const pageData = {
                ...post,
                menu
            };

            // Cria a estrutura de diretórios ano/mês/post
            const postDir = path.join(outputDir, post.year, post.month, post.slug);
            await fs.mkdir(postDir, { recursive: true });

            // Copia as imagens do post
            await copyPostImages(post.content, postDir);

            // Renderiza o template de conteúdo
            const html = env.render('content.html', pageData);
            await fs.writeFile(path.join(postDir, 'index.html'), html);
            console.log(`✅ Página ${post.year}/${post.month}/${post.slug} gerada com sucesso`);
        }
    } catch (error) {
        console.error('❌ Erro ao gerar páginas de conteúdo:', error);
        throw error;
    }
} 
