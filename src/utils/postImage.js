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
  const postTitle = post.title || 'Post sem título';

  // 1. Verifica no metadata
  if (post.coverImage) {
    const url = cleanUrl(post.coverImage);
    if (url.startsWith('http')) {
      return url;
    }
    return `/media/${url}`;
  }
  if (post.image) {
    const url = cleanUrl(post.image);
    if (url.startsWith('http')) {
      return url;
    }
    return `/media/${url}`;
  }
  if (post.metadata?.coverImage) {
    const url = cleanUrl(post.metadata.coverImage);
    if (url.startsWith('http')) {
      return url;
    }
    return `/media/${url}`;
  }
  if (post.metadata?.image) {
    const url = cleanUrl(post.metadata.image);
    if (url.startsWith('http')) {
      return url;
    }
    return `/media/${url}`;
  }

  // 2. Procura a primeira imagem no conteúdo markdown
  if (post.content) {
    // Markdown ![alt](url)
    const mdImg = post.content.match(/!\[[^\]]*\]\(([^)]+)\)/);
    if (mdImg && mdImg[1]) {
      const url = cleanUrl(mdImg[1].split('?')[0]); // Remove query params
      return url.startsWith('http') ? url : `/media/${url}`;
    }

    // HTML <img src="...">
    const htmlImg = post.content.match(/<img[^>]+src=["']([^"'>]+)["']/i);
    if (htmlImg && htmlImg[1]) {
      const url = cleanUrl(htmlImg[1].split('?')[0]); // Remove query params
      return url.startsWith('http') ? url : `/media/${url}`;
    }

    // Markdown ![alt](url) com espaços
    const mdImgWithSpaces = post.content.match(/!\[[^\]]*\]\(\s*([^)]+)\s*\)/);
    if (mdImgWithSpaces && mdImgWithSpaces[1]) {
      const url = cleanUrl(mdImgWithSpaces[1].split('?')[0]); // Remove query params
      return url.startsWith('http') ? url : `/media/${url}`;
    }

    // HTML <img src="..." alt="...">
    const htmlImgWithAlt = post.content.match(/<img[^>]+src=["']([^"'>]+)["'][^>]*alt=["'][^"']*["']/i);
    if (htmlImgWithAlt && htmlImgWithAlt[1]) {
      const url = cleanUrl(htmlImgWithAlt[1].split('?')[0]); // Remove query params
      return url.startsWith('http') ? url : `/media/${url}`;
    }
  }

  // 3. Imagem padrão
  console.log(`⚠️  Imagem não encontrada para o post: "${postTitle}"`);
  return defaultImage;
} 
