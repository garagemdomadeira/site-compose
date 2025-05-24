/**
 * Utilitário para gerenciamento de arquivos de mídia.
 * Este módulo é responsável por localizar e copiar imagens referenciadas
 * nos posts para o diretório de saída, mantendo a organização por ano/mês.
 */

import fs from 'fs/promises';
import path from 'path';
import { mediaDir } from './config.js';

/**
 * Procura uma imagem específica na estrutura de diretórios de mídia
 * @param {string} imageName - Nome do arquivo de imagem a ser procurado
 * @returns {Promise<string|null>} Caminho completo da imagem se encontrada, null caso contrário
 */
export async function findImageInMedia(imageName) {
    try {
        // Lista todos os anos
        const years = await fs.readdir(mediaDir);
        
        for (const year of years) {
            const yearPath = path.join(mediaDir, year);
            const months = await fs.readdir(yearPath);
            
            for (const month of months) {
                const monthPath = path.join(yearPath, month);
                const files = await fs.readdir(monthPath);
                
                // Procura por arquivos que contenham o nome da imagem
                const matchingFile = files.find(file => file.includes(imageName));
                if (matchingFile) {
                    return path.join(monthPath, matchingFile);
                }
            }
        }
        return null;
    } catch (error) {
        console.error('❌ Erro ao procurar imagem:', error);
        return null;
    }
}

/**
 * Copia todas as imagens referenciadas em um post para o diretório de saída
 * @param {string} content - Conteúdo HTML do post
 * @param {string} outputPath - Caminho do diretório de saída do post
 * @returns {Promise<void>}
 */
export async function copyPostImages(content, outputPath) {
    try {
        // Cria pasta de imagens no diretório de saída
        const imagesDir = path.join(outputPath, 'images');
        await fs.mkdir(imagesDir, { recursive: true });

        // Procura por links de imagens no Markdown
        const imageRegex = /!\[.*?\]\((.*?)\)/g;
        let match;
        
        while ((match = imageRegex.exec(content)) !== null) {
            const imagePath = match[1];
            const imageName = path.basename(imagePath);
            
            // Procura a imagem na pasta media
            const mediaImagePath = await findImageInMedia(imageName);
            if (mediaImagePath) {
                // Copia a imagem para a pasta de saída
                await fs.copyFile(mediaImagePath, path.join(imagesDir, imageName));
                console.log(`✅ Imagem ${imageName} copiada com sucesso`);
            }
        }
    } catch (error) {
        console.error('❌ Erro ao copiar imagens do post:', error);
    }
} 
