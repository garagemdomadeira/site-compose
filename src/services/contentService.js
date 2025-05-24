/**
 * Serviço para manipulação de conteúdo.
 * Responsável por processar arquivos Markdown e converter para HTML.
 */

import fs from 'fs/promises';
import path from 'path';
import { contentDir } from '../utils/config.js';
import { extractFrontmatter } from '../utils/frontmatter.js';
import { marked } from 'marked';

/**
 * Processa o conteúdo do post, transformando links do YouTube em embeds
 * @param {Object} post - Objeto do post com conteúdo e metadados
 * @returns {Object} Post processado com conteúdo atualizado
 */
function contentProcessor(post) {
    // Regex para identificar links do YouTube
    const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/g;
    
    // Verifica se o conteúdo já contém um embed do YouTube
    if (post.content.includes('youtube-embed')) {
        return post;
    }
    
    // Processa o conteúdo HTML
    const processedContent = post.content.replace(youtubeRegex, (match, videoId) => {
        // Verifica se este vídeo já foi processado
        if (post.content.includes(`embed/${videoId}`)) {
            return match;
        }
        
        // Cria o embed do YouTube com responsividade
        return `
            <div class="youtube-embed">
                <iframe 
                    src="https://www.youtube.com/embed/${videoId}" 
                    title="YouTube video player" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
                </iframe>
            </div>
        `;
    });

    return {
        ...post,
        content: processedContent
    };
}

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
                const html = marked(markdownContent);
                
                const post = {
                    ...metadata,
                    content: html,
                    slug: path.basename(file, '.md')
                };

                // Processa o conteúdo do post
                return contentProcessor(post);
            })
        );
        console.log(`✅ ${posts.length} arquivos Markdown carregados com sucesso`);
        return posts;
    } catch (error) {
        console.error('❌ Erro ao ler arquivos Markdown:', error);
        throw error;
    }
} 
