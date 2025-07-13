/**
 * Função utilitária para detectar a imagem principal de um post.
 * Estratégia:
 * 1. Para posts, usa o nome do arquivo markdown
 * 2. Para outras páginas, usa a imagem padrão
 *
 * @param {Object} post - Objeto do post (deve conter metadata e content)
 * @param {string} [defaultImage='/media/garagem_do_madeira_p.png'] - Caminho da imagem padrão
 * @returns {string} Caminho da imagem principal
 */

// Função auxiliar para limpar a URL
const cleanUrl = (url) => {
  if (!url) return '';
  // Remove aspas extras e espaços
  return url.replace(/^["']|["']$/g, '').trim();
};

export function detectMainImage(post, defaultImage = '/media/garagem_do_madeira_p.png') {
  if (!post) return defaultImage;
  
  // Se o post tiver um slug, retorna o caminho da imagem baseado no slug
  if (post.slug) {
    return `/media/${post.slug}.jpg`;
  }
  
  return defaultImage;
} 
