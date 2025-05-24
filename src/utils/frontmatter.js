/**
 * Utilitário para extração de metadados do frontmatter em arquivos Markdown.
 * Este módulo é responsável por processar o cabeçalho YAML dos arquivos Markdown
 * e extrair informações como título, data, tags e outros metadados.
 */

/**
 * Extrai metadados do frontmatter de um arquivo Markdown
 * @param {string} content - Conteúdo completo do arquivo Markdown
 * @returns {Object} Objeto contendo os metadados extraídos e o conteúdo restante
 * @property {Object} metadata - Objeto com os metadados extraídos
 * @property {string} content - Conteúdo do arquivo sem o frontmatter
 */
export function extractFrontmatter(content) {
    const frontmatterRegex = /^---\n([\s\S]*?)\n---/;
    const match = content.match(frontmatterRegex);
    
    if (match) {
        const frontmatter = match[1];
        const metadata = {};
        
        frontmatter.split('\n').forEach(line => {
            const [key, ...values] = line.split(':');
            if (key && values.length > 0) {
                metadata[key.trim()] = values.join(':').trim();
            }
        });
        
        // Garante que a data está no formato correto
        if (metadata.date) {
            const date = new Date(metadata.date);
            metadata.year = date.getFullYear().toString();
            metadata.month = (date.getMonth() + 1).toString().padStart(2, '0');
        }
        
        return {
            metadata,
            content: content.slice(match[0].length).trim()
        };
    }
    
    return {
        metadata: {},
        content
    };
} 
