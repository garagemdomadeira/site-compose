/**
 * Gerador da página inicial do site.
 * Este módulo é responsável por gerar a página inicial do site,
 * combinando a estrutura da home com o menu e renderizando o template.
 */

import fs from 'fs/promises';
import path from 'path';
import { outputDir, env } from '../utils/config.js';
import { readStructure, readMenu, copyStaticFiles } from '../services/fileService.js';
import { fileExists } from '../utils/fileExists.js';
import { copyHomeImages } from '../services/homeImageService.js';

const defaultImage = '/media/default.jpg';

function getImageFromSlug(link) {
    if (!link) return defaultImage;
    // Extrai o slug do link (exemplo: 2021/03/filtros-par-honda-cr-v-2007-2011/index.html)
    const parts = link.split('/');
    // Remove o 'index.html' e pega o penúltimo elemento que é o slug
    const slug = parts[parts.length - 2];
    return `/media/${slug}.jpg`;
}

async function processSections(sections) {
    // Filtra as seções que estão publicadas
    const publishedSections = sections.filter(section => section.published !== false);
    
    // Percorre todas as seções e ajusta as imagens
    return Promise.all(publishedSections.map(async section => {
        if (section.data && section.data.link && !section.data.image) {
            section.data.image = getImageFromSlug(section.data.link);
        }
        if (section.items) {
            section.items = section.items.map(item => {
                if (item.link && !item.image) {
                    item.image = getImageFromSlug(item.link);
                }
                return item;
            });
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
        // Copia os arquivos estáticos
        await copyStaticFiles();

        // Lê a estrutura da home e o menu
        const [homeStructure, menu] = await Promise.all([
            readStructure('home'),
            readMenu()
        ]);

        // Copia as imagens da página inicial
        await copyHomeImages(homeStructure);

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
