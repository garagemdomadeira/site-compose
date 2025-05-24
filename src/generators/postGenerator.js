/**
 * Gerador de posts.
 * Responsável por gerar páginas de posts individuais.
 */

import fs from 'fs/promises';
import path from 'path';
import { outputDir } from '../utils/config.js';
import { renderTemplate } from '../utils/template.js';

/**
 * Gera uma página de post individual
 * @param {Object} post - Dados do post
 * @param {Object} menu - Dados do menu
 * @returns {Promise<void>}
 */
export async function generatePost(post, menu) {
    try {
        const html = await renderTemplate('post', {
            post,
            menu,
            title: post.title,
            description: post.description
        });

        const outputPath = path.join(outputDir, 'posts', `${post.slug}.html`);
        
        // Garante que o diretório existe
        await fs.mkdir(path.dirname(outputPath), { recursive: true });
        
        await fs.writeFile(outputPath, html);
        console.log(`✅ Post gerado com sucesso: ${post.slug}`);
    } catch (error) {
        console.error(`❌ Erro ao gerar post ${post.slug}:`, error);
        throw error;
    }
} 
