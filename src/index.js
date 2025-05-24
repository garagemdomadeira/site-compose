/**
 * Ponto de entrada principal da aplicação.
 * Este arquivo orquestra todo o processo de geração do site,
 * coordenando a geração da página inicial e das páginas de conteúdo.
 */

import { generateHomePage } from './generators/homeGenerator.js';
import { generateContentPages } from './generators/contentGenerator.js';
import { generateAllPostsPage } from './generators/allPostsGenerator.js';
import { readMarkdownFiles } from './services/contentService.js';
import { readMenu } from './services/fileService.js';
import { copyImagesToOutput } from './services/imageService.js';

/**
 * Função principal que coordena a geração do site
 * @returns {Promise<void>}
 * @throws {Error} Se houver erro durante a geração do site
 */
async function main() {
    try {
        console.log('🚀 Iniciando geração de páginas...');
        
        // Carrega dados necessários
        const posts = await readMarkdownFiles();
        const menu = await readMenu();
        
        // Copia as imagens para output/media
        await copyImagesToOutput(posts);
        
        // Gera as páginas
        await generateHomePage();
        await generateContentPages();
        await generateAllPostsPage(posts, menu);
        
        console.log('✨ Geração de páginas concluída com sucesso!');
    } catch (error) {
        console.error('❌ Erro durante a geração de páginas:', error);
        process.exit(1);
    }
}

// Executa o programa
main();
