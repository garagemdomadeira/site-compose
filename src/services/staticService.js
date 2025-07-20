/**
 * Serviço para manipulação de arquivos estáticos.
 * Responsável por combinar e copiar arquivos CSS e outros recursos estáticos.
 */

import fs from 'fs/promises';
import path from 'path';
import { outputDir, rootDir } from '../utils/config.js';
import { combineCSSFiles } from './cssUtils.js';

/**
 * Lista de arquivos estáticos para copiar
 * @type {Array<{source: string, target: string, combine?: boolean}>}
 */
const staticFiles = [
    // Arquivos CSS para combinar
    {
        source: path.join(rootDir, 'src', 'assets', 'styles.css'),
        target: path.join(outputDir, 'assets', 'styles.css'),
        combine: true
    },
    {
        source: path.join(rootDir, 'src', 'assets', 'embeds.css'),
        target: path.join(outputDir, 'assets', 'styles.css'),
        combine: true
    },
    // Arquivos para copiar diretamente
    {
        source: path.join(rootDir, 'src', 'assets', 'search.css'),
        target: path.join(outputDir, 'assets', 'search.css')
    },
    {
        source: path.join(rootDir, 'src', 'assets', 'search.js'),
        target: path.join(outputDir, 'assets', 'search.js')
    },
    // robots.txt
    {
        source: path.join(rootDir, 'src', 'robots.txt'),
        target: path.join(outputDir, 'robots.txt')
    }
];

/**
 * Copia arquivos estáticos para o diretório de saída
 * @returns {Promise<void>}
 */
export async function copyStaticFiles() {
    try {
        // Cria a pasta assets no output
        const outputAssetsDir = path.join(outputDir, 'assets');
        await fs.mkdir(outputAssetsDir, { recursive: true });

        // Separa arquivos para combinar e para copiar
        const filesToCombine = staticFiles.filter(file => file.combine);
        const filesToCopy = staticFiles.filter(file => !file.combine);

        // Combina os arquivos CSS
        if (filesToCombine.length > 0) {
            const combinedCSS = await combineCSSFiles(filesToCombine.map(file => file.source));
            await fs.writeFile(filesToCombine[0].target, combinedCSS);
            console.log('✅ Arquivos CSS combinados com sucesso');
        }

        // Copia os arquivos individuais
        for (const file of filesToCopy) {
            await fs.copyFile(file.source, file.target);
            console.log(`✅ Arquivo copiado: ${path.basename(file.source)}`);
        }

        console.log('✅ Arquivos estáticos copiados com sucesso');
    } catch (error) {
        console.error('❌ Erro ao copiar arquivos estáticos:', error);
        throw error;
    }
} 
