/**
 * Serviço para manipulação de arquivos estáticos.
 * Responsável por combinar e copiar arquivos CSS e outros recursos estáticos.
 */

import fs from 'fs/promises';
import path from 'path';
import { outputDir, rootDir } from '../utils/config.js';

/**
 * Combina múltiplos arquivos CSS em um único arquivo
 * @param {string[]} cssFiles - Array com os caminhos dos arquivos CSS
 * @returns {Promise<string>} Conteúdo combinado dos arquivos CSS
 */
async function combineCSSFiles(cssFiles) {
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

/**
 * Copia arquivos estáticos para o diretório de saída
 * @returns {Promise<void>}
 */
export async function copyStaticFiles() {
    try {
        // Cria a pasta assets no output
        const outputAssetsDir = path.join(outputDir, 'assets');
        await fs.mkdir(outputAssetsDir, { recursive: true });

        // Lista de arquivos CSS para combinar
        const cssFiles = [
            path.join(rootDir, 'src', 'assets', 'styles.css'),
            path.join(rootDir, 'src', 'assets', 'embeds.css')
        ];

        // Combina os arquivos CSS
        const combinedCSS = await combineCSSFiles(cssFiles);

        // Salva o arquivo CSS combinado
        await fs.writeFile(
            path.join(outputAssetsDir, 'styles.css'),
            combinedCSS
        );

        console.log('✅ Arquivos estáticos copiados com sucesso');
    } catch (error) {
        console.error('❌ Erro ao copiar arquivos estáticos:', error);
        throw error;
    }
} 
