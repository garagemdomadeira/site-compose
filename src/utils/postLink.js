/**
 * Função utilitária para gerar o link de um post baseado em sua data e slug.
 * @param {Object} post - Objeto do post (deve conter as propriedades 'date' e 'slug')
 * @returns {string} Link no formato /YYYY/MM/slug
 */
export function generatePostLink(post) {
  const date = new Date(post.date);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `/${year}/${month}/${post.slug}`;
} 
