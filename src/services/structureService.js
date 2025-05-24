/**
 * Serviço para manipulação de arquivos de estrutura.
 * Responsável por ler e processar arquivos JSON de estrutura e menu.
 */

import fs from 'fs/promises';
import path from 'path';
import { structuresDir } from '../utils/config.js';

/**
 * Lê e parseia um arquivo de estrutura JSON
 * @param {string} page - Nome da página para carregar a estrutura
 * @returns {Promise<Object>} Estrutura da página parseada
 */
export async function readStructure(page) {
    try {
        const structure = await fs.readFile(path.join(structuresDir, `${page}.json`), 'utf-8');
        console.log(`✅ Estrutura ${page}.json carregada com sucesso`);
        return JSON.parse(structure);
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
