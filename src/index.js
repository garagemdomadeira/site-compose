/**
 * Ponto de entrada principal da aplicação.
 * Este arquivo orquestra todo o processo de geração do site,
 * coordenando a geração da página inicial e das páginas de conteúdo.
 */

import { generateHomePage } from './generators/homeGenerator.js';
import { generateContentPages } from './generators/contentGenerator.js';

/**
 * Função principal que coordena a geração do site
 * @returns {Promise<void>}
 * @throws {Error} Se houver erro durante a geração do site
 */
async function main() {
    try {
        console.log('🚀 Iniciando geração de páginas...');
        await generateHomePage();
        await generateContentPages();
        console.log('✨ Geração de páginas concluída com sucesso!');
    } catch (error) {
        console.error('❌ Erro durante a geração de páginas:', error);
        process.exit(1);
    }
}

// Executa o programa
main();
