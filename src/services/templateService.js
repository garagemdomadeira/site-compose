/**
 * Serviço de template
 * Este arquivo é responsável por renderizar os templates do site
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import nunjucks from 'nunjucks';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const templatesDir = path.join(__dirname, '../../templates');

// Configura o Nunjucks
const env = nunjucks.configure(templatesDir, {
    autoescape: true,
    noCache: true
});

// Adiciona filtros personalizados
env.addFilter('cleanTitle', function(str) {
    if (!str) return '';
    return str
        .replace(/[^\w\s]/gi, '') // Remove caracteres especiais
        .replace(/\s+/g, ' ')     // Remove espaços extras
        .trim();                   // Remove espaços no início e fim
});

env.addFilter('date', function(date, format) {
    if (!date) return '';
    const d = new Date(date);
    if (isNaN(d.getTime())) return '';

    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();

    return `${day}/${month}/${year}`;
});

/**
 * Renderiza um template com os dados fornecidos e salva no arquivo de saída
 * @param {string} templateName - Nome do template a ser renderizado
 * @param {string} outputPath - Caminho onde o arquivo será salvo
 * @param {Object} data - Dados para renderizar o template
 * @returns {Promise<void>}
 */
export async function renderTemplate(templateName, outputPath, data = {}) {
    try {
        console.log(`Renderizando template ${templateName} para ${outputPath}`);
        
        // Renderiza o template usando Nunjucks
        const content = env.render(templateName, data);
        
        // Garante que o diretório existe
        await fs.mkdir(path.dirname(outputPath), { recursive: true });
        
        // Salva o arquivo
        await fs.writeFile(outputPath, content, 'utf-8');
        console.log(`✅ Arquivo salvo em ${outputPath}`);
    } catch (error) {
        console.error(`❌ Erro ao renderizar template ${templateName}:`, error);
        throw error;
    }
} 
