import fs from 'fs/promises';
import path from 'path';
import { readStructure } from '../services/structureService.js';

/**
 * Gera arquivos HTML individuais com redirect via meta tag
 * @returns {Promise<void>}
 */
export async function generate() {
    try {
        // Carrega a estrutura de redirecionamentos
        const redirectsStructure = await readStructure('redirects');
        
        console.log('🔄 Gerando arquivos HTML de redirect...');
        
        // Processa cada redirect
        for (const redirect of redirectsStructure.redirects) {
            await generateRedirectFile(redirect);
        }
        
        console.log('✅ Arquivos HTML de redirect gerados com sucesso!');
    } catch (error) {
        console.error('❌ Erro ao gerar arquivos HTML de redirect:', error);
    }
}

/**
 * Gera um arquivo HTML individual para um redirect específico
 * @param {Object} redirect - Objeto com from, to e status
 * @returns {Promise<void>}
 */
async function generateRedirectFile(redirect) {
    try {
        // Remove a barra inicial e final para criar o caminho do arquivo
        let filePath = redirect.from.replace(/^\/+|\/+$/g, '');
        
        // Se o caminho estiver vazio, usa 'index'
        if (!filePath) {
            filePath = 'index';
        }
        
        // Cria o caminho completo para o arquivo HTML
        const outputPath = path.join(process.cwd(), 'output', filePath, 'index.html');
        
        // Garante que o diretório existe
        await fs.mkdir(path.dirname(outputPath), { recursive: true });
        
        // Gera o conteúdo HTML com meta refresh
        const htmlContent = generateRedirectHTML(redirect);
        
        // Escreve o arquivo HTML
        await fs.writeFile(outputPath, htmlContent, 'utf-8');
        
        console.log(`✅ Redirect HTML gerado: ${filePath}/index.html`);
    } catch (error) {
        console.error(`❌ Erro ao gerar redirect para ${redirect.from}:`, error);
    }
}

/**
 * Gera o conteúdo HTML para o redirect
 * @param {Object} redirect - Objeto com from, to e status
 * @returns {string} Conteúdo HTML
 */
function generateRedirectHTML(redirect) {
    // Se a URL de destino estiver vazia, redireciona para a página inicial
    const targetUrl = redirect.to || '/';
    const delay = redirect.status === 301 ? 0 : 3; // 301 = imediato, outros = 3 segundos
    
    return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Redirecionando...</title>
    <meta http-equiv="refresh" content="${delay};url=${targetUrl}">
    <link rel="canonical" href="${targetUrl}">
    <meta name="robots" content="noindex">
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            color: white;
        }
        .container {
            text-align: center;
            background: rgba(255, 255, 255, 0.1);
            padding: 2rem;
            border-radius: 10px;
            backdrop-filter: blur(10px);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }
        .spinner {
            border: 3px solid rgba(255, 255, 255, 0.3);
            border-top: 3px solid white;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
            margin: 0 auto 1rem;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        a {
            color: white;
            text-decoration: underline;
        }
        a:hover {
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="spinner"></div>
        <h1>Redirecionando...</h1>
        <p>Você será redirecionado automaticamente em ${delay} segundo${delay !== 1 ? 's' : ''}.</p>
        <p>Se você não for redirecionado automaticamente, <a href="${targetUrl}">clique aqui</a>.</p>
    </div>
    <script>
        // Fallback JavaScript para garantir o redirect
        setTimeout(function() {
            window.location.href = '${targetUrl}';
        }, ${delay * 1000});
    </script>
</body>
</html>`;
} 
