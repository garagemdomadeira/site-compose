/**
 * Serviço para manipulação de arquivos de estrutura.
 * Responsável por ler e processar arquivos JSON de estrutura e menu.
 */

import fs from 'fs/promises';
import path from 'path';
import { structuresDir } from '../utils/config.js';

/**
 * Processa as imagens dos produtos, copiando-as da pasta media para output/media
 * @param {Object} structure - Estrutura da página
 * @returns {Promise<void>}
 */
async function processProductImages(structure) {
    const sections = structure.sections || [];
    const productsSection = sections.find(section => section.type === 'products');
    
    if (!productsSection || !productsSection.items) return;

    for (const product of productsSection.items) {
        if (product.image) {
            // Usando path.resolve para garantir caminhos absolutos corretos
            const sourcePath = path.resolve('media', product.image);
            const targetPath = path.resolve('output', 'media', product.image);
            
            try {
                // Verifica se o diretório de destino existe
                await fs.mkdir(path.dirname(targetPath), { recursive: true });
                
                // Copia o arquivo
                await fs.copyFile(sourcePath, targetPath);
                console.log(`✅ Imagem ${product.image} copiada com sucesso de ${sourcePath} para ${targetPath}`);
            } catch (error) {
                console.error(`❌ Erro ao copiar imagem ${product.image}:`, error);
                console.error(`Caminho fonte: ${sourcePath}`);
                console.error(`Caminho destino: ${targetPath}`);
            }
        }
    }
}

/**
 * Lê e parseia um arquivo de estrutura JSON
 * @param {string} page - Nome da página para carregar a estrutura
 * @returns {Promise<Object>} Estrutura da página parseada
 */
export async function readStructure(page) {
    try {
        const structure = await fs.readFile(path.join(structuresDir, `${page}.json`), 'utf-8');
        const parsedStructure = JSON.parse(structure);
        
        // Processa as imagens dos produtos
        await processProductImages(parsedStructure);
        
        console.log(`✅ Estrutura ${page}.json carregada com sucesso`);
        return parsedStructure;
    } catch (error) {
        console.error(`❌ Erro ao ler estrutura ${page}.json:`, error);
        throw error;
    }
}

/**
 * Lê e parseia o arquivo de menu
 * @returns {Promise<Object>} Estrutura do menu parseada
 */
export async function readMenu() {
    try {
        const menu = await fs.readFile(path.join(structuresDir, 'menu.json'), 'utf-8');
        console.log('✅ Menu carregado com sucesso');
        return JSON.parse(menu);
    } catch (error) {
        console.error('❌ Erro ao ler menu:', error);
        throw error;
    }
} 
