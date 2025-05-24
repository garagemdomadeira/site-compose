/**
 * Função utilitária para detectar a imagem principal de um post.
 * Estratégia:
 * 1. Verifica se há imagem no metadata (coverImage, image, etc)
 * 2. Procura a primeira imagem no conteúdo markdown
 * 3. Retorna uma imagem padrão se não encontrar nenhuma
 *
 * @param {Object} post - Objeto do post (deve conter metadata e content)
 * @param {string} [defaultImage='/media/default.jpg'] - Caminho da imagem padrão
 * @returns {string} Caminho da imagem principal
 */

// Função auxiliar para limpar a URL
const cleanUrl = (url) => {
  if (!url) return '';
  // Remove aspas extras e espaços
  return url.replace(/^["']|["']$/g, '').trim();
};

export function detectMainImage(post, defaultImage = '/media/default.jpg') {
  if (!post) return defaultImage;
  
  // Se o post tiver um slug, retorna o caminho da imagem baseado no slug
  if (post.slug) {
    return `/media/${post.slug}.jpg`;
  }
  
  return defaultImage;
} 
