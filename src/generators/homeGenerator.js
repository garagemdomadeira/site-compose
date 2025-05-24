/**
 * Gerador da página inicial do site.
 * Este módulo é responsável por gerar a página inicial do site,
 * combinando a estrutura da home com o menu e renderizando o template.
 */

import fs from 'fs/promises';
import path from 'path';
import { outputDir, env } from '../utils/config.js';
import { readStructure, readMenu, cleanOutput, copyStaticFiles } from '../services/fileService.js';
import { fileExists } from '../utils/fileExists.js';

const defaultImage = '/assets/default_image.jpg';

async function ensureImageExists(image, postLink) {
    if (!image) return defaultImage;
    if (image.startsWith('http')) return image;
    // Se for caminho relativo, verificar se existe na pasta do post
    if (postLink) {
        // postLink exemplo: 2021/09/como-remover-parachoque-honda-fit-2003-2008/index.html
        const postDir = path.join(outputDir, postLink.replace('/index.html', ''), 'images');
        const imagePath = path.join(postDir, path.basename(image));
        if (await fileExists(imagePath)) {
            return image;
        }
    }
    return defaultImage;
}

async function processSections(sections) {
    // Percorre todas as seções e ajusta as imagens
    return Promise.all(sections.map(async section => {
        if (section.data && section.data.image && section.data.link) {
            section.data.image = await ensureImageExists(section.data.image, section.data.link);
        }
        if (section.items) {
            section.items = await Promise.all(section.items.map(async item => {
                if (item.image && item.link) {
                    item.image = await ensureImageExists(item.image, item.link);
                }
                return item;
            }));
        }
        return section;
    }));
}

/**
 * Gera a página inicial do site
 * @returns {Promise<void>}
 * @throws {Error} Se houver erro durante a geração da página
 */
export async function generateHomePage() {
    try {
        // Limpa a pasta output
        await cleanOutput();

        // Copia os arquivos estáticos
        await copyStaticFiles();

        // Lê a estrutura da home e o menu
        const [homeStructure, menu] = await Promise.all([
            readStructure('home'),
            readMenu()
        ]);

        // Ajusta as imagens das seções
        const sections = await processSections(homeStructure.sections || []);
        const pageData = {
            ...homeStructure,
            sections,
            menu
        };

        // Renderiza o template home.html com os dados combinados
        const html = env.render('home.html', pageData);
        await fs.writeFile(path.join(outputDir, 'index.html'), html);
        console.log('✅ Página inicial gerada com sucesso');
    } catch (error) {
        console.error('❌ Erro ao gerar página inicial:', error);
        throw error;
    }
} 
