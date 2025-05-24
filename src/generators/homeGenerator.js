/**
 * Gerador da página inicial do site.
 * Este módulo é responsável por gerar a página inicial do site,
 * combinando a estrutura da home com o menu e renderizando o template.
 */

import fs from 'fs/promises';
import path from 'path';
import { outputDir, env } from '../utils/config.js';
import { readStructure, readMenu, cleanOutput, copyStaticFiles } from '../services/fileService.js';

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

        // Combina os dados da home com o menu
        const pageData = {
            ...homeStructure,
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
