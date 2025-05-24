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
const outputDir = path.join(rootDir, 'output');
const structuresDir = path.join(rootDir, 'structures');
const templatesDir = path.join(rootDir, 'templates');
const contentDir = path.join(rootDir, 'content', 'post');
const mediaDir = path.join(rootDir, 'media');

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
    outputDir,
    structuresDir,
    templatesDir,
    contentDir,
    mediaDir,
    env
}; 
