/**
 * Utilitário para gerenciamento de arquivos de mídia.
 * Este módulo é responsável por localizar e copiar imagens referenciadas
 * nos posts para o diretório de saída, mantendo a organização por ano/mês.
 */

import fs from 'fs/promises';
import path from 'path';
import { mediaDir, outputDir } from './config.js';

/**
 * Procura uma imagem específica na estrutura de diretórios de mídia
 * @param {string} imageName - Nome do arquivo de imagem a ser procurado
 * @returns {Promise<string|null>} Caminho completo da imagem se encontrada, null caso contrário
 */
export async function findImageInMedia(imageName) {
    console.log('🔍 Procurando imagem:', imageName);
    try {
        // Lista todos os arquivos no diretório media
        const files = await fs.readdir(mediaDir);
        console.log(`📁 Encontrados ${files.length} arquivos no diretório media`);
        
        // Remove a extensão do nome da imagem para busca mais flexível
        const imageNameWithoutExt = path.parse(imageName).name;
        console.log(`🔍 Procurando por: ${imageNameWithoutExt}`);
        
        // Procura por arquivos que contenham o nome da imagem (com ou sem extensão)
        const matchingFile = files.find(file => {
            const fileNameWithoutExt = path.parse(file).name;
            return file.includes(imageName) || fileNameWithoutExt === imageNameWithoutExt;
        });
        
        if (matchingFile) {
            const fullPath = path.join(mediaDir, matchingFile);
            console.log(`✅ Imagem encontrada: ${fullPath}`);
            return fullPath;
        }
        
        console.log(`❌ Imagem não encontrada: ${imageName}`);
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
        console.log('🖼️  Iniciando cópia de imagens do post');
        
        // Usa o diretório output/media
        const outputMediaDir = path.join(outputDir, 'media');
        await fs.mkdir(outputMediaDir, { recursive: true });
        console.log(`📁 Diretório de destino: ${outputMediaDir}`);

        // Procura por tags de imagem no HTML
        const imageRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
        let match;
        let imageCount = 0;
        let localImageCount = 0;
        
        while ((match = imageRegex.exec(content)) !== null) {
            const imagePath = match[1];
            const imageName = path.basename(imagePath);
            
            console.log(`📸 Encontrada tag img com src: ${imagePath}`);
            console.log(`📄 Nome extraído: ${imageName}`);
            
            // Verifica se é uma imagem local (não começa com http/https)
            if (!imagePath.startsWith('http://') && !imagePath.startsWith('https://')) {
                console.log(`🏠 Imagem local detectada: ${imageName}`);
                
                // Procura a imagem na pasta media
                const mediaImagePath = await findImageInMedia(imageName);
                if (mediaImagePath) {
                    // Verifica se a imagem já existe em output/media
                    const targetPath = path.join(outputMediaDir, imageName);
                    try {
                        await fs.access(targetPath);
                        console.log(`⏭️  Imagem ${imageName} já existe em output/media, pulando...`);
                    } catch (error) {
                        // Copia a imagem para output/media
                        await fs.copyFile(mediaImagePath, targetPath);
                        console.log(`✅ Imagem local ${imageName} copiada para output/media`);
                    }
                    localImageCount++;
                } else {
                    console.log(`⚠️  Imagem local ${imageName} não encontrada na pasta media`);
                }
            } else {
                console.log(`🌐 Imagem externa detectada: ${imagePath} (não será copiada)`);
            }
            
            imageCount++;
        }
        
        console.log(`📊 Total de imagens processadas: ${imageCount}`);
        console.log(`📁 Imagens locais copiadas para output/media: ${localImageCount}`);
    } catch (error) {
        console.error('❌ Erro ao copiar imagens do post:', error);
    }
} 
