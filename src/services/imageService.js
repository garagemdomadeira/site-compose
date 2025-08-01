import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { copyImageOrUseDefault } from './imageUtils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..', '..');

/**
 * Copia as imagens dos posts para a pasta output/media
 * @param {Array} posts - Array de posts com suas meta informações
 * @returns {Promise<void>}
 */
export async function copyImagesToOutput(posts) {
    try {
        const mediaDir = path.join(rootDir, 'media');
        const outputMediaDir = path.join(rootDir, 'output', 'media');

        console.log(`📁 Diretório media: ${mediaDir}`);
        console.log(`📁 Diretório output/media: ${outputMediaDir}`);

        // Cria a pasta output/media se não existir
        await fs.mkdir(outputMediaDir, { recursive: true });
        console.log('✅ Pasta output/media criada com sucesso');

        // Copia a imagem padrão garage_do_madeira_p.png para output/media
        const defaultImagePath = path.join(mediaDir, 'garagem_do_madeira_p.png');
        const targetDefaultImagePath = path.join(outputMediaDir, 'garagem_do_madeira_p.png');
        try {
            await fs.copyFile(defaultImagePath, targetDefaultImagePath);
            console.log(`✅ Imagem padrão ${path.basename(defaultImagePath)} copiada com sucesso.`);
        } catch (error) {
            console.error(`❌ Erro ao copiar imagem padrão ${path.basename(defaultImagePath)}:`, error);
        }

        // Processa cada post
        for (const post of posts) {
            const postSlug = (post.metadata && post.metadata.slug) || post.slug;
            if (postSlug) {
                await copyImageOrUseDefault(postSlug, postSlug, mediaDir, outputMediaDir);
            }
        }
    } catch (error) {
        console.error('❌ Erro ao copiar imagens:', error);
        throw error;
    }
} 
