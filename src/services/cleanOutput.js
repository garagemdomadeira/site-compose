/**
 * Serviço para limpeza do diretório de saída.
 * Responsável por limpar e recriar a estrutura do diretório output.
 */

import fs from 'fs/promises';
import { outputDir } from '../utils/config.js';

/**
 * Limpa o diretório de saída e cria uma nova estrutura vazia
 * @returns {Promise<void>}
 */
export async function cleanOutput() {
    try {
        await fs.rm(outputDir, { recursive: true, force: true });
        await fs.mkdir(outputDir);
        console.log('✅ Pasta output limpa com sucesso');
    } catch (error) {
        console.error('❌ Erro ao limpar pasta output:', error);
        throw error;
    }
} 
