import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Remove acentos de uma string, substituindo por caracteres similares sem acento
 * @param {string} str - String a ser processada
 * @returns {string} - String sem acentos
 */
function removeAccents(str) {
    const accentMap = {
        'á': 'a', 'à': 'a', 'ã': 'a', 'â': 'a', 'ä': 'a', 'å': 'a',
        'é': 'e', 'è': 'e', 'ê': 'e', 'ë': 'e',
        'í': 'i', 'ì': 'i', 'î': 'i', 'ï': 'i',
        'ó': 'o', 'ò': 'o', 'õ': 'o', 'ô': 'o', 'ö': 'o',
        'ú': 'u', 'ù': 'u', 'û': 'u', 'ü': 'u',
        'ý': 'y', 'ÿ': 'y',
        'ñ': 'n',
        'ç': 'c',
        'Á': 'A', 'À': 'A', 'Ã': 'A', 'Â': 'A', 'Ä': 'A', 'Å': 'A',
        'É': 'E', 'È': 'E', 'Ê': 'E', 'Ë': 'E',
        'Í': 'I', 'Ì': 'I', 'Î': 'I', 'Ï': 'I',
        'Ó': 'O', 'Ò': 'O', 'Õ': 'O', 'Ô': 'O', 'Ö': 'O',
        'Ú': 'U', 'Ù': 'U', 'Û': 'U', 'Ü': 'U',
        'Ý': 'Y',
        'Ñ': 'N',
        'Ç': 'C'
    };
    
    return str.replace(/[áàãâäåéèêëíìîïóòõôöúùûüýÿñçÁÀÃÂÄÅÉÈÊËÍÌÎÏÓÒÕÔÖÚÙÛÜÝÑÇ]/g, char => accentMap[char] || char);
}

/**
 * Normaliza uma tag: converte para minúsculas, remove acentos e substitui espaços por traços
 * @param {string} tag - A tag a ser normalizada
 * @returns {string} - A tag normalizada
 */
function normalizeTag(tag) {
    return removeAccents(tag.toLowerCase()).replace(/\s+/g, '-');
}

/**
 * Processa o frontmatter de um arquivo markdown e normaliza as tags
 * @param {string} content - Conteúdo do arquivo markdown
 * @returns {string} - Conteúdo com tags normalizadas
 */
function processFrontmatter(content) {
    // Regex para encontrar o frontmatter (entre ---)
    const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n/;
    const match = content.match(frontmatterRegex);
    
    if (!match) {
        return content; // Se não há frontmatter, retorna o conteúdo original
    }
    
    const frontmatter = match[1];
    let modified = false;
    
    // Regex para encontrar a seção de tags
    const tagsRegex = /^tags:\s*\n((?:\s*-\s*"[^"]*"\s*\n?)*)/gm;
    const tagsMatch = frontmatter.match(tagsRegex);
    
    if (tagsMatch) {
        const tagsSection = tagsMatch[0];
        const tagLines = tagsSection.match(/^\s*-\s*"([^"]*)"\s*$/gm);
        
        if (tagLines) {
            const normalizedTags = tagLines.map(line => {
                const tagMatch = line.match(/^\s*-\s*"([^"]*)"\s*$/);
                if (tagMatch) {
                    const originalTag = tagMatch[1];
                    const normalizedTag = normalizeTag(originalTag);
                    if (originalTag !== normalizedTag) {
                        modified = true;
                    }
                    return `  - "${normalizedTag}"`;
                }
                return line;
            });
            
            if (modified) {
                const newTagsSection = 'tags:\n' + normalizedTags.join('\n');
                const newFrontmatter = frontmatter.replace(tagsRegex, newTagsSection);
                const newContent = content.replace(frontmatterRegex, `---\n${newFrontmatter}\n---\n\n`);
                return newContent;
            }
        }
    }
    
    return content;
}

/**
 * Processa um arquivo markdown individual
 * @param {string} filePath - Caminho do arquivo
 */
function processFile(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        const processedContent = processFrontmatter(content);
        
        if (content !== processedContent) {
            fs.writeFileSync(filePath, processedContent, 'utf8');
            console.log(`✅ Processado: ${path.basename(filePath)}`);
        } else {
            console.log(`⏭️  Sem alterações: ${path.basename(filePath)}`);
        }
    } catch (error) {
        console.error(`❌ Erro ao processar ${filePath}:`, error.message);
    }
}

/**
 * Processa todos os arquivos markdown em um diretório recursivamente
 * @param {string} dirPath - Caminho do diretório
 */
function processDirectory(dirPath) {
    try {
        const items = fs.readdirSync(dirPath);
        
        for (const item of items) {
            const fullPath = path.join(dirPath, item);
            const stat = fs.statSync(fullPath);
            
            if (stat.isDirectory()) {
                processDirectory(fullPath);
            } else if (item.endsWith('.md')) {
                processFile(fullPath);
            }
        }
    } catch (error) {
        console.error(`❌ Erro ao processar diretório ${dirPath}:`, error.message);
    }
}

/**
 * Função principal
 */
function main() {
    const contentDir = path.join(__dirname, '..', 'content');
    
    if (!fs.existsSync(contentDir)) {
        console.error(`❌ Diretório não encontrado: ${contentDir}`);
        process.exit(1);
    }
    
    console.log('🚀 Iniciando normalização de tags...');
    console.log(`📁 Processando arquivos em: ${contentDir}`);
    console.log('');
    
    processDirectory(contentDir);
    
    console.log('');
    console.log('✅ Normalização de tags concluída!');
}

// Executa o script se for chamado diretamente
main();

export {
    normalizeTag,
    processFrontmatter,
    processFile,
    processDirectory
}; 
