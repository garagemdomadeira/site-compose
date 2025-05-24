/**
 * Gerador de feeds.
 * Responsável por gerar feeds RSS e sitemap.
 */

import fs from 'fs/promises';
import path from 'path';
import { outputDir } from '../utils/config.js';
import { renderTemplate } from '../utils/template.js';

/**
 * Gera o feed RSS do blog
 * @param {Array} posts - Lista de posts
 * @returns {Promise<void>}
 */
export async function generateFeed(posts) {
    try {
        const feed = await renderTemplate('feed', { posts });
        const outputPath = path.join(outputDir, 'feed.xml');
        
        await fs.writeFile(outputPath, feed);
        console.log('✅ Feed RSS gerado com sucesso');
    } catch (error) {
        console.error('❌ Erro ao gerar feed RSS:', error);
        throw error;
    }
}

/**
 * Gera o sitemap do blog
 * @param {Array} posts - Lista de posts
 * @returns {Promise<void>}
 */
export async function generateSitemap(posts) {
    try {
        const sitemap = await renderTemplate('sitemap', { posts });
        const outputPath = path.join(outputDir, 'sitemap.xml');
        
        await fs.writeFile(outputPath, sitemap);
        console.log('✅ Sitemap gerado com sucesso');
    } catch (error) {
        console.error('❌ Erro ao gerar sitemap:', error);
        throw error;
    }
} 
