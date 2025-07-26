/**
 * Gerador de sitemap.xml para o site
 * Este arquivo é responsável por criar o arquivo sitemap.xml
 * que ajuda os motores de busca a indexar o site
 */

import fs from 'fs/promises';
import path from 'path';
import { readMarkdownFiles } from '../services/contentService.js';
import { baseUrl } from '../utils/config.js';

/**
 * Gera o arquivo sitemap.xml com todas as URLs do site
 * @returns {Promise<void>}
 */
export async function generateSitemap() {
    try {
        const posts = await readMarkdownFiles();
        
        // URLs fixas do site
        const staticUrls = [
            '/',
            '/posts',
            '/sobre',
            '/contato'
        ];

        // URLs dos posts
        const postUrls = posts.map(post => `/posts/${post.slug}`);

        // Combina todas as URLs
        const allUrls = [...staticUrls, ...postUrls];

        // Cria o conteúdo do sitemap
        const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${allUrls.map(url => `
    <url>
        <loc>${baseUrl}${url}</loc>
        <changefreq>weekly</changefreq>
        <priority>${url === '/' ? '1.0' : '0.8'}</priority>
    </url>`).join('')}
</urlset>`;

        // Salva o arquivo sitemap.xml
        await fs.writeFile(
            path.join('output', 'sitemap.xml'),
            sitemapContent,
            'utf-8'
        );

        console.log('🗺️ Sitemap.xml gerado com sucesso!');
    } catch (error) {
        console.error('❌ Erro ao gerar sitemap.xml:', error);
        throw error;
    }
} 
