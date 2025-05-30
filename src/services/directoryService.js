import fs from 'fs/promises';
import path from 'path';

/**
 * Garante que um diretório existe, criando-o se necessário
 * @param {string} dirPath - Caminho do diretório a ser criado
 * @returns {Promise<void>}
 */
export async function ensureDirectoryExists(dirPath) {
    try {
        await fs.access(dirPath);
    } catch (error) {
        // Se o diretório não existe, cria-o
        await fs.mkdir(dirPath, { recursive: true });
    }
} 
