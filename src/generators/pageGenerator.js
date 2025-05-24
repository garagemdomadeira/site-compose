/**
 * Gerador de páginas.
 * Responsável por gerar páginas HTML a partir de templates e dados.
 */

import fs from 'fs/promises';
import path from 'path';
import { outputDir } from '../utils/config.js';
import { renderTemplate } from '../utils/template.js';

/**
 * Gera uma página HTML a partir de um template e dados
 * @param {string} template - Nome do template a ser usado
 * @param {Object} data - Dados para renderizar o template
 * @param {string} outputPath - Caminho de saída do arquivo HTML
 * @returns {Promise<void>}
 */
export async function generatePage(template, data, outputPath) {
    try {
        const html = await renderTemplate(template, data);
        const fullPath = path.join(outputDir, outputPath);
        
        // Garante que o diretório existe
        await fs.mkdir(path.dirname(fullPath), { recursive: true });
        
        await fs.writeFile(fullPath, html);
        console.log(`✅ Página gerada com sucesso: ${outputPath}`);
    } catch (error) {
        console.error(`❌ Erro ao gerar página ${outputPath}:`, error);
        throw error;
    }
} 
