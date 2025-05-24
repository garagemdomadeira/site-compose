/**
 * Serviço de manipulação de arquivos do sistema.
 * Este módulo é responsável por todas as operações de leitura, escrita e manipulação
 * de arquivos do sistema, incluindo arquivos Markdown, JSON e arquivos estáticos.
 */

import fs from 'fs/promises';
import path from 'path';
import { outputDir, structuresDir, contentDir, rootDir } from '../utils/config.js';
import { extractFrontmatter } from '../utils/frontmatter.js';
import { marked } from 'marked';

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

/**
 * Lê todos os arquivos Markdown do diretório de conteúdo
 * @returns {Promise<Array>} Array de posts com metadados e conteúdo convertido para HTML
 */
export async function readMarkdownFiles() {
    try {
        const files = await fs.readdir(contentDir);
        const markdownFiles = files.filter(file => file.endsWith('.md'));
        const posts = await Promise.all(
            markdownFiles.map(async file => {
                const content = await fs.readFile(path.join(contentDir, file), 'utf-8');
                const { metadata, content: markdownContent } = extractFrontmatter(content);
                const html = marked(markdownContent);
                
                return {
                    ...metadata,
                    content: html,
                    slug: path.basename(file, '.md')
                };
            })
        );
        console.log(`✅ ${posts.length} arquivos Markdown carregados com sucesso`);
        return posts;
    } catch (error) {
        console.error('❌ Erro ao ler arquivos Markdown:', error);
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

        // Copia o arquivo CSS
        await fs.copyFile(
            path.join(rootDir, 'src', 'assets', 'styles.css'),
            path.join(outputAssetsDir, 'styles.css')
        );
        console.log('✅ Arquivos estáticos copiados com sucesso');
    } catch (error) {
        console.error('❌ Erro ao copiar arquivos estáticos:', error);
        throw error;
    }
} 
