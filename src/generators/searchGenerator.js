/**
 * Gerador da página de pesquisa
 * Este arquivo é responsável por criar a página de pesquisa do site
 */

import fs from 'fs/promises';
import path from 'path';
import { renderTemplate } from '../services/templateService.js';
import { readMenu } from '../services/fileService.js';

/**
 * Gera a página de pesquisa
 * @returns {Promise<void>}
 */
export async function generateSearchPage() {
    try {
        const menu = await readMenu();
        const template = await renderTemplate('search.html', {
            title: 'Pesquisa',
            meta: {
                descricao: 'Pesquise por conteúdo no Garagem do Madeira',
                keywords: 'pesquisa, busca, carros, automóveis'
            },
            menu
        });

        await fs.writeFile(
            path.join('output', 'search.html'),
            template,
            'utf-8'
        );

        console.log('🔍 Página de pesquisa gerada com sucesso!');
    } catch (error) {
        console.error('❌ Erro ao gerar página de pesquisa:', error);
        throw error;
    }
} 
