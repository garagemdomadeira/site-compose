// minify.js
// Script para minificar HTML, CSS e JS da pasta output para production (ES Modules)

import fs from 'fs';
import fsp from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const productionDir = path.join(__dirname, 'production');
const outputDir = path.join(__dirname, 'output');

function log(msg) {
  console.log('🛠️', msg);
}

async function removeDir(dir) {
  if (fs.existsSync(dir)) {
    await fsp.rm(dir, { recursive: true, force: true });
    log(`Pasta removida: ${dir}`);
  }
}

async function copyDir(src, dest) {
  await fsp.mkdir(dest, { recursive: true });
  const entries = await fsp.readdir(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath);
    } else {
      await fsp.copyFile(srcPath, destPath);
    }
  }
}

function minifyHTML(file) {
  try {
    execSync(`npx html-minifier --collapse-whitespace --remove-comments --remove-optional-tags --remove-redundant-attributes --remove-script-type-attributes --remove-tag-whitespace --use-short-doctype --minify-css true --minify-js true -o "${file}" "${file}"`);
    log(`HTML minificado: ${file}`);
  } catch (e) {
    log(`Erro ao minificar HTML: ${file}`);
  }
}

function minifyCSS(file) {
  try {
    execSync(`npx cleancss -o "${file}" "${file}"`);
    log(`CSS minificado: ${file}`);
  } catch (e) {
    log(`Erro ao minificar CSS: ${file}`);
  }
}

function minifyJS(file) {
  try {
    execSync(`npx uglifyjs "${file}" -c -m -o "${file}"`);
    log(`JS minificado: ${file}`);
  } catch (e) {
    log(`Erro ao minificar JS: ${file}`);
  }
}

async function minifyAll(dir) {
  const entries = await fsp.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await minifyAll(fullPath);
    } else if (entry.name.endsWith('.html')) {
      minifyHTML(fullPath);
    } else if (entry.name.endsWith('.css')) {
      minifyCSS(fullPath);
    } else if (entry.name.endsWith('.js')) {
      minifyJS(fullPath);
    }
  }
}

// Função para converter imagens para webp e remover originais
async function convertImagesToWebp(dir) {
  const entries = await fsp.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await convertImagesToWebp(fullPath);
    } else if (entry.name.match(/\.(jpe?g|png)$/i)) {
      const webpPath = fullPath.replace(/\.(jpe?g|png)$/i, '.webp');
      try {
        await sharp(fullPath)
          .webp({ quality: 80 })
          .toFile(webpPath);
        await fsp.unlink(fullPath);
        log(`Convertido para WebP e removido original: ${webpPath}`);
      } catch (e) {
        log(`Erro ao converter para WebP: ${fullPath}`);
      }
    }
  }
}

// Função para atualizar referências de imagens nos HTMLs
async function updateImageReferencesToWebp(dir) {
  const entries = await fsp.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await updateImageReferencesToWebp(fullPath);
    } else if (entry.name.endsWith('.html')) {
      let content = await fsp.readFile(fullPath, 'utf-8');
      // Substitui .jpg, .jpeg, .png por .webp nas referências
      content = content.replace(/\.(jpe?g|png)/gi, '.webp');
      await fsp.writeFile(fullPath, content, 'utf-8');
      log(`Referências de imagem atualizadas para WebP: ${fullPath}`);
    }
  }
}

(async () => {
  log('Removendo pasta production antiga...');
  await removeDir(productionDir);
  log('Copiando arquivos de output para production...');
  await copyDir(outputDir, productionDir);
  log('Minificando arquivos HTML, CSS e JS em production...');
  await minifyAll(productionDir);
  log('Convertendo imagens para WebP e otimizando...');
  await convertImagesToWebp(path.join(productionDir, 'media'));
  log('Atualizando referências de imagens nos HTMLs para .webp...');
  await updateImageReferencesToWebp(productionDir);
  log('✅ Minificação concluída! Arquivos prontos em production/.');
})(); 
