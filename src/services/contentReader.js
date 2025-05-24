/**
 * Serviço para leitura de conteúdo.
 * Responsável por ler e processar arquivos Markdown do diretório de conteúdo.
 */

import fs from 'fs/promises';
import path from 'path';
import { contentDir } from '../utils/config.js';
import { extractFrontmatter } from '../utils/frontmatter.js';
import { marked } from 'marked';
import { processYouTubeLinks } from '../contentProcessors/youtubeEmbed.js';

/**
 * Lê todos os arquivos Markdown do diretório de conteúdo
 * @returns {Promise<Array>} Array de posts com metadados e conteúdo convertido para HTML
 */
export async function readMarkdownFiles() {
    try {
        const files = await fs.readdir(contentDir);
        const markdownFiles = files.filter(file => file.endsWith('.md'));
        const posts = await Promise.all(
            markdownFiles.map(async file => {
                const content = await fs.readFile(path.join(contentDir, file), 'utf-8');
                const { metadata, content: markdownContent } = extractFrontmatter(content);
                
                // Processa os links do YouTube antes de converter para HTML
                const processedContent = processYouTubeLinks(markdownContent);
                const html = marked(processedContent);
                
                return {
                    ...metadata,
                    content: html,
                    slug: path.basename(file, '.md')
                };
            })
        );
        console.log(`✅ ${posts.length} arquivos Markdown carregados com sucesso`);
        return posts;
    } catch (error) {
        console.error('❌ Erro ao ler arquivos Markdown:', error);
        throw error;
    }
} 
