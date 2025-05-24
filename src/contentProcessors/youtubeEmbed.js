/**
 * Processador de embeds do YouTube.
 * Responsável por transformar links do YouTube em embeds responsivos.
 */

/**
 * Processa o conteúdo do post, transformando links do YouTube em embeds
 * @param {string} content - Conteúdo Markdown do post
 * @returns {string} Conteúdo processado com embeds do YouTube
 */
export function processYouTubeLinks(content) {
    // Regex para identificar links do YouTube
    const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/g;
    
    // Processa o conteúdo Markdown
    return content.replace(youtubeRegex, (match, videoId) => {
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
</div>`;
    });
} 
