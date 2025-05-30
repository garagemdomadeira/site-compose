/**
 * Serviço para processamento de imagens da página inicial.
 * Responsável por copiar as imagens referenciadas no arquivo home.json
 * para o diretório de saída.
 */

import fs from 'fs/promises';
import path from 'path';
import { rootDir } from '../utils/config.js';

/**
 * Extrai todas as imagens referenciadas nas seções do arquivo home.json
 * @param {Object} structure - Estrutura da página inicial
 * @returns {Array<string>} Lista de nomes de arquivos de imagem
 */
function extractImagesFromStructure(structure) {
    const images = new Set();
    
    // Função auxiliar para processar itens
    const processItems = (items) => {
        if (!items) return;
        items.forEach(item => {
            if (item.image) {
                images.add(item.image);
            }
        });
    };

    // Processa todas as seções
    structure.sections.forEach(section => {
        // Processa seção de destaque
        if (section.type === 'highlight' && section.data && section.data.image) {
            images.add(section.data.image);
        }
        
        // Processa seções com itens
        if (section.items) {
            processItems(section.items);
        }
    });

    return Array.from(images);
}

/**
 * Copia as imagens da página inicial para o diretório de saída
 * @param {Object} structure - Estrutura da página inicial
 * @returns {Promise<void>}
 */
export async function copyHomeImages(structure) {
    try {
        const mediaDir = path.join(rootDir, 'media');
        const outputMediaDir = path.join(rootDir, 'output', 'media');

        // Cria o diretório de saída se não existir
        await fs.mkdir(outputMediaDir, { recursive: true });

        // Extrai todas as imagens referenciadas
        const images = extractImagesFromStructure(structure);

        // Copia cada imagem
        for (const image of images) {
            const sourcePath = path.join(mediaDir, image);
            const targetPath = path.join(outputMediaDir, image);

            try {
                await fs.copyFile(sourcePath, targetPath);
                console.log(`✅ Imagem ${image} copiada com sucesso`);
            } catch (error) {
                console.error(`❌ Erro ao copiar imagem ${image}:`, error);
            }
        }
    } catch (error) {
        console.error('❌ Erro ao processar imagens da página inicial:', error);
        throw error;
    }
} 
