import fs from 'fs/promises';
import path from 'path';

/**
 * Gera arquivos HTML individuais com redirect via meta tag baseados no links.json
 * @returns {Promise<void>}
 */
export async function generate() {
    try {
        // Carrega o arquivo links.json
        const linksPath = path.join(process.cwd(), 'content', 'links', 'links.json');
        const linksData = JSON.parse(await fs.readFile(linksPath, 'utf-8'));
        
        console.log('🔗 Gerando arquivos HTML de redirect para links...');
        
        // Processa cada link recursivamente
        await processLinksRecursively(linksData, []);
        
        console.log('✅ Arquivos HTML de redirect para links gerados com sucesso!');
    } catch (error) {
        console.error('❌ Erro ao gerar arquivos HTML de redirect para links:', error);
    }
}

/**
 * Processa recursivamente a estrutura hierárquica de links
 * @param {Object} obj - Objeto atual sendo processado
 * @param {Array} pathArray - Array com o caminho atual
 * @returns {Promise<void>}
 */
async function processLinksRecursively(obj, pathArray) {
    const currentPath = pathArray.join('/');
    const subItems = [];
    const subFolders = [];
    
    for (const [key, value] of Object.entries(obj)) {
        if (typeof value === 'string') {
            // É uma URL, gera o arquivo
            const fullPath = pathArray.concat(key).join('/');
            await generateLinkRedirectFile(fullPath, value);
            subItems.push({ name: key, url: value, type: 'link' });
        } else if (typeof value === 'object' && value !== null) {
            // É um objeto, continua recursivamente
            subFolders.push({ name: key, path: pathArray.concat(key).join('/') });
            await processLinksRecursively(value, pathArray.concat(key));
        }
    }
    
    // Gera página index se houver subpastas ou itens
    if (subFolders.length > 0 || subItems.length > 0) {
        await generateIndexPage(currentPath, subFolders, subItems);
    }
}

/**
 * Gera um arquivo HTML individual para um redirect de link específico
 * @param {string} key - Chave do link (nome da página)
 * @param {string} url - URL de destino
 * @returns {Promise<void>}
 */
async function generateLinkRedirectFile(key, url) {
    try {
        // Cria o caminho completo para o arquivo HTML dentro da pasta /link/
        const outputPath = path.join(process.cwd(), 'output', 'link', key, 'index.html');
        
        // Garante que o diretório existe
        await fs.mkdir(path.dirname(outputPath), { recursive: true });
        
        // Gera o conteúdo HTML com meta refresh
        const htmlContent = generateLinkRedirectHTML(key, url);
        
        // Escreve o arquivo HTML
        await fs.writeFile(outputPath, htmlContent, 'utf-8');
        
        console.log(`✅ Link redirect HTML gerado: ${key}/index.html -> ${url}`);
    } catch (error) {
        console.error(`❌ Erro ao gerar redirect para ${key}:`, error);
    }
}

/**
 * Gera uma página index listando subpastas e links
 * @param {string} currentPath - Caminho atual
 * @param {Array} subFolders - Array de subpastas
 * @param {Array} subItems - Array de links diretos
 * @returns {Promise<void>}
 */
async function generateIndexPage(currentPath, subFolders, subItems) {
    try {
        const outputPath = path.join(process.cwd(), 'output', 'link', currentPath, 'index.html');
        
        // Garante que o diretório existe
        await fs.mkdir(path.dirname(outputPath), { recursive: true });
        
        // Gera o conteúdo HTML da página index
        const htmlContent = generateIndexHTML(currentPath, subFolders, subItems);
        
        // Escreve o arquivo HTML
        await fs.writeFile(outputPath, htmlContent, 'utf-8');
        
        console.log(`✅ Página index gerada: link/${currentPath}/index.html`);
    } catch (error) {
        console.error(`❌ Erro ao gerar página index para ${currentPath}:`, error);
    }
}

/**
 * Gera o conteúdo HTML para a página index
 * @param {string} currentPath - Caminho atual
 * @param {Array} subFolders - Array de subpastas
 * @param {Array} subItems - Array de links diretos
 * @returns {string} Conteúdo HTML
 */
function generateIndexHTML(currentPath, subFolders, subItems) {
    const pageTitle = currentPath ? currentPath.split('/').pop() : 'Links';
    const breadcrumb = currentPath ? currentPath.split('/') : [];
    
    let breadcrumbHTML = '<nav class="breadcrumb"><a href="/link/">🏠 Início</a>';
    let currentBreadcrumbPath = '';
    
    breadcrumb.forEach((segment, index) => {
        currentBreadcrumbPath += (currentBreadcrumbPath ? '/' : '') + segment;
        const isLast = index === breadcrumb.length - 1;
        breadcrumbHTML += ` <span class="separator">›</span> `;
        if (isLast) {
            breadcrumbHTML += `<span class="current">${segment}</span>`;
        } else {
            breadcrumbHTML += `<a href="/link/${currentBreadcrumbPath}/">${segment}</a>`;
        }
    });
    breadcrumbHTML += '</nav>';
    
    let contentHTML = '';
    
    // Subpastas
    if (subFolders.length > 0) {
        contentHTML += '<section class="folders"><h2>📁 Pastas</h2><ul>';
        subFolders.forEach(folder => {
            contentHTML += `<li><a href="/link/${folder.path}/">📁 ${folder.name}</a></li>`;
        });
        contentHTML += '</ul></section>';
    }
    
    // Links diretos
    if (subItems.length > 0) {
        contentHTML += '<section class="links"><h2>🔗 Links</h2><ul>';
        subItems.forEach(item => {
            contentHTML += `<li><a href="/link/${currentPath}/${item.name}/" target="_blank">🔗 ${item.name}</a></li>`;
        });
        contentHTML += '</ul></section>';
    }
    
    return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${pageTitle} - Links</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
        .container { max-width: 800px; margin: 0 auto; background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        h1 { color: #333; margin-bottom: 20px; }
        .breadcrumb { margin-bottom: 20px; padding: 10px; background: #f8f9fa; border-radius: 4px; }
        .breadcrumb a { color: #007bff; text-decoration: none; }
        .breadcrumb a:hover { text-decoration: underline; }
        .separator { color: #666; margin: 0 5px; }
        .current { color: #333; font-weight: bold; }
        section { margin-bottom: 30px; }
        h2 { color: #555; margin-bottom: 15px; border-bottom: 2px solid #e9ecef; padding-bottom: 5px; }
        ul { list-style: none; padding: 0; }
        li { margin-bottom: 8px; }
        li a { color: #007bff; text-decoration: none; padding: 8px 12px; display: block; border-radius: 4px; transition: background 0.2s; }
        li a:hover { background: #e9ecef; text-decoration: none; }
        .empty { color: #666; font-style: italic; }
    </style>
</head>
<body>
    <div class="container">
        <h1>📂 ${pageTitle}</h1>
        ${breadcrumbHTML}
        ${contentHTML || '<p class="empty">Nenhum conteúdo encontrado.</p>'}
    </div>
</body>
</html>`;
}

/**
 * Gera o conteúdo HTML para o redirect de link
 * @param {string} key - Chave do link
 * @param {string} url - URL de destino
 * @returns {string} Conteúdo HTML
 */
function generateLinkRedirectHTML(key, url) {
    const delay = 1; // 1 segundo de delay
    
    return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Redirecionando...</title>
    <meta http-equiv="refresh" content="${delay};url=${url}">
    <link rel="canonical" href="${url}">
    <meta name="robots" content="noindex">
</head>
<body>
    <script>
        // Redirect imediato via JavaScript
        window.location.href = '${url}';
    </script>
</body>
</html>`;
}
