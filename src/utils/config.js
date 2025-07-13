/**
 * Arquivo de configuração central do projeto.
 * Contém todas as constantes de diretórios e configurações do Nunjucks.
 * Este arquivo serve como ponto único de referência para configurações globais.
 */

import path from 'path';
import { fileURLToPath } from 'url';
import nunjucks from 'nunjucks';

// Configuração de diretórios
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '../..');
export const outputDir = path.join(rootDir, 'output');
export const contentDir = path.join(rootDir, 'content', 'post');
export const mediaDir = path.join(rootDir, 'media');
export const structuresDir = path.join(rootDir, 'structures');
export const templatesDir = path.join(rootDir, 'templates');

export const baseUrl = 'https://garagemdomadeira.com.br';

// Configuração do Nunjucks
const env = nunjucks.configure(templatesDir, {
    autoescape: true,
    noCache: true
});

// Filtro para remover aspas do título
env.addFilter('cleanTitle', function(str) {
    if (!str) return '';
    return str.replace(/^['"]|['"]$/g, '');
});

// Filtro de data para o Nunjucks
env.addFilter('date', function(str, format) {
    const date = new Date();
    return date.getFullYear().toString();
});

export {
    rootDir,
    env
}; 
