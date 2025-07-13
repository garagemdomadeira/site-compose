/**
 * Gerador da página de pesquisa
 * Este arquivo é responsável por criar a página de pesquisa do site
 */

import path from 'path';
import { renderTemplate } from '../services/templateService.js';
import { readMenu } from '../services/fileService.js';

const defaultImage = '/media/garagem_do_madeira_p.png';

/**
 * Gera a página de pesquisa
 * @returns {Promise<void>}
 */
export async function generateSearchPage() {
    try {
        const menu = await readMenu();
        await renderTemplate(
            'search.html',
            path.join('output', 'search.html'),
            {
                title: 'Pesquisa',
                meta: {
                    descricao: 'Pesquise por conteúdo no Garagem do Madeira',
                    keywords: 'pesquisa, busca, carros, automóveis',
                    image: defaultImage,
                    type: 'website'
                },
                menu
            }
        );
        console.log('🔍 Página de pesquisa gerada com sucesso!');
    } catch (error) {
        console.error('❌ Erro ao gerar página de pesquisa:', error);
        throw error;
    }
} 
