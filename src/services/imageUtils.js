/**
 * Utilitários para manipulação de imagens.
 * Este módulo contém funções auxiliares para manipulação de imagens.
 */

import fs from 'fs/promises';
import path from 'path';

/**
 * Sanitiza o nome do arquivo removendo caracteres especiais
 * @param {string} fileName - Nome do arquivo a ser sanitizado
 * @returns {string} Nome do arquivo sanitizado
 */
function sanitizeFileName(fileName) {
    return fileName
        .replace(/['"]/g, '') // Remove aspas simples e duplas
        .replace(/[<>:"/\\|?*]/g, '') // Remove caracteres inválidos para nomes de arquivo
        .trim(); // Remove espaços em branco no início e fim
}

/**
 * Copia uma imagem específica ou usa a imagem padrão
 * @param {string} imageName - Nome do arquivo de imagem
 * @param {string} postSlug - Slug do post
 * @param {string} mediaDir - Diretório de origem das imagens
 * @param {string} outputMediaDir - Diretório de destino das imagens
 * @returns {Promise<void>}
 */
export async function copyImageOrUseDefault(imageName, postSlug, mediaDir, outputMediaDir) {
    const sanitizedImageName = sanitizeFileName(imageName);
    const sourcePath = path.join(mediaDir, sanitizedImageName);
    const targetPath = path.join(outputMediaDir, sanitizedImageName);
    
    try {
        // Verifica se o diretório de origem existe
        await fs.access(mediaDir);
        
        // Cria o diretório de destino se não existir
        await fs.mkdir(outputMediaDir, { recursive: true });
        
        // Verifica se o arquivo de origem existe
        await fs.access(sourcePath);
        
        await fs.copyFile(sourcePath, targetPath);
        console.log(`\t✅ Imagem copiada: ${sanitizedImageName} para ${targetPath}`);
    } catch (error) {
        console.log(`\t⚠️ Erro ao copiar imagem ${sanitizedImageName}, usando imagem padrão`);
        const defaultImage = path.join(mediaDir, 'default_image.jpg');
        const targetImage = path.join(outputMediaDir, `${postSlug}.jpg`);
        await fs.copyFile(defaultImage, targetImage);
        console.log(`\t✅ Imagem padrão copiada: default_image.jpg para ${targetImage}`);
    }
} 
