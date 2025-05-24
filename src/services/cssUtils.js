/**
 * Utilitários para manipulação de arquivos CSS.
 * Este módulo contém funções auxiliares para manipulação de arquivos CSS.
 */

import fs from 'fs/promises';
import path from 'path';

/**
 * Combina múltiplos arquivos CSS em um único arquivo
 * @param {string[]} cssFiles - Array com os caminhos dos arquivos CSS
 * @returns {Promise<string>} Conteúdo combinado dos arquivos CSS
 */
export async function combineCSSFiles(cssFiles) {
    try {
        const cssContents = await Promise.all(
            cssFiles.map(file => fs.readFile(file, 'utf-8'))
        );
        
        // Adiciona comentários para identificar cada seção
        return cssContents.map((content, index) => {
            const fileName = path.basename(cssFiles[index]);
            return `/* ${fileName} */\n${content}\n`;
        }).join('\n');
    } catch (error) {
        console.error('❌ Erro ao combinar arquivos CSS:', error);
        throw error;
    }
} 
