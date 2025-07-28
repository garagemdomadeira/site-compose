/**
 * Utilitário para gerenciamento de arquivos de mídia.
 * Este módulo é responsável por localizar e copiar imagens referenciadas
 * nos posts para o diretório de saída, mantendo a organização por ano/mês.
 */

import fs from 'fs/promises';
import path from 'path';
import { mediaDir, outputDir } from './config.js';

/**
 * Procura um arquivo de mídia específico na estrutura de diretórios de mídia
 * @param {string} fileName - Nome do arquivo de mídia a ser procurado
 * @returns {Promise<string|null>} Caminho completo do arquivo se encontrado, null caso contrário
 */
export async function findMediaFile(fileName) {
    console.log('🔍 Procurando arquivo de mídia:', fileName);
    try {
        // Lista todos os arquivos no diretório media
        const files = await fs.readdir(mediaDir);
        console.log(`📁 Encontrados ${files.length} arquivos no diretório media`);
        
        // Remove a extensão do nome do arquivo para busca mais flexível
        const fileNameWithoutExt = path.parse(fileName).name;
        console.log(`🔍 Procurando por: ${fileNameWithoutExt}`);
        
        // Procura por arquivos que contenham o nome do arquivo (com ou sem extensão)
        const matchingFile = files.find(file => {
            const fileWithoutExt = path.parse(file).name;
            return file.includes(fileName) || fileWithoutExt === fileNameWithoutExt;
        });
        
        if (matchingFile) {
            const fullPath = path.join(mediaDir, matchingFile);
            console.log(`✅ Arquivo encontrado: ${fullPath}`);
            return fullPath;
        }
        
        console.log(`❌ Arquivo não encontrado: ${fileName}`);
        return null;
    } catch (error) {
        console.error('❌ Erro ao procurar arquivo:', error);
        return null;
    }
}

// Mantém compatibilidade com código existente
export async function findImageInMedia(imageName) {
    return findMediaFile(imageName);
}

/**
 * Copia todas as imagens e arquivos de mídia referenciados em um post para o diretório de saída
 * @param {string} content - Conteúdo HTML do post
 * @param {string} outputPath - Caminho do diretório de saída do post
 * @returns {Promise<void>}
 */
export async function copyPostImages(content, outputPath) {
    try {
        console.log('🖼️  Iniciando cópia de imagens e arquivos de mídia do post');
        
        // Usa o diretório output/media
        const outputMediaDir = path.join(outputDir, 'media');
        await fs.mkdir(outputMediaDir, { recursive: true });
        console.log(`📁 Diretório de destino: ${outputMediaDir}`);

        let totalProcessed = 0;
        let localFilesCopied = 0;

        // 1. Procura por tags de imagem no HTML
        const imageRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
        let match;
        
        while ((match = imageRegex.exec(content)) !== null) {
            const imagePath = match[1];
            const imageName = path.basename(imagePath);
            
            console.log(`📸 Encontrada tag img com src: ${imagePath}`);
            console.log(`📄 Nome extraído: ${imageName}`);
            
            await processMediaFile(imagePath, imageName, outputMediaDir);
            totalProcessed++;
        }

        // 2. Procura por tags object no HTML (SVG, PDF, etc.)
        const objectRegex = /<object[^>]+data=["']([^"']+)["'][^>]*>/gi;
        
        while ((match = objectRegex.exec(content)) !== null) {
            const objectPath = match[1];
            const objectName = path.basename(objectPath);
            
            console.log(`📄 Encontrada tag object com data: ${objectPath}`);
            console.log(`📄 Nome extraído: ${objectName}`);
            
            await processMediaFile(objectPath, objectName, outputMediaDir);
            totalProcessed++;
        }

        // 3. Procura por tags video no HTML
        const videoRegex = /<video[^>]+src=["']([^"']+)["'][^>]*>/gi;
        
        while ((match = videoRegex.exec(content)) !== null) {
            const videoPath = match[1];
            const videoName = path.basename(videoPath);
            
            console.log(`🎥 Encontrada tag video com src: ${videoPath}`);
            console.log(`📄 Nome extraído: ${videoName}`);
            
            await processMediaFile(videoPath, videoName, outputMediaDir);
            totalProcessed++;
        }

        // 4. Procura por tags audio no HTML
        const audioRegex = /<audio[^>]+src=["']([^"']+)["'][^>]*>/gi;
        
        while ((match = audioRegex.exec(content)) !== null) {
            const audioPath = match[1];
            const audioName = path.basename(audioPath);
            
            console.log(`🎵 Encontrada tag audio com src: ${audioPath}`);
            console.log(`📄 Nome extraído: ${audioName}`);
            
            await processMediaFile(audioPath, audioName, outputMediaDir);
            totalProcessed++;
        }

        // 5. Procura por tags source dentro de video/audio
        const sourceRegex = /<source[^>]+src=["']([^"']+)["'][^>]*>/gi;
        
        while ((match = sourceRegex.exec(content)) !== null) {
            const sourcePath = match[1];
            const sourceName = path.basename(sourcePath);
            
            console.log(`📄 Encontrada tag source com src: ${sourcePath}`);
            console.log(`📄 Nome extraído: ${sourceName}`);
            
            await processMediaFile(sourcePath, sourceName, outputMediaDir);
            totalProcessed++;
        }
        
        console.log(`📊 Total de arquivos de mídia processados: ${totalProcessed}`);
        console.log(`📁 Arquivos locais copiados para output/media: ${localFilesCopied}`);
    } catch (error) {
        console.error('❌ Erro ao copiar arquivos de mídia do post:', error);
    }
}

/**
 * Processa um arquivo de mídia individual
 * @param {string} filePath - Caminho do arquivo
 * @param {string} fileName - Nome do arquivo
 * @param {string} outputMediaDir - Diretório de destino
 * @returns {Promise<void>}
 */
async function processMediaFile(filePath, fileName, outputMediaDir) {
    // Verifica se é um arquivo local (não começa com http/https)
    if (!filePath.startsWith('http://') && !filePath.startsWith('https://')) {
        console.log(`🏠 Arquivo local detectado: ${fileName}`);
        
        // Procura o arquivo na pasta media
        const mediaFilePath = await findMediaFile(fileName);
        if (mediaFilePath) {
            // Verifica se o arquivo já existe em output/media
            const targetPath = path.join(outputMediaDir, fileName);
            try {
                await fs.access(targetPath);
                console.log(`⏭️  Arquivo ${fileName} já existe em output/media, pulando...`);
            } catch (error) {
                // Copia o arquivo para output/media
                await fs.copyFile(mediaFilePath, targetPath);
                console.log(`✅ Arquivo local ${fileName} copiado para output/media`);
            }
        } else {
            console.log(`⚠️  Arquivo local ${fileName} não encontrado na pasta media`);
        }
    } else {
        console.log(`🌐 Arquivo externo detectado: ${filePath} (não será copiado)`);
    }
} 
