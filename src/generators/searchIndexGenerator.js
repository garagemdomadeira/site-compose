/**
 * Gerador de índice de pesquisa em JSON
 * Este arquivo é responsável por criar um arquivo JSON com palavras-chave
 * e pontuações para auxiliar na pesquisa do site
 */

import fs from 'fs/promises';
import path from 'path';
import { readMarkdownFiles } from '../services/contentService.js';

// Lista de palavras a serem ignoradas no indexador
const STOP_WORDS = new Set([
    // URLs e protocolos
    'http', 'https', 'www', 'com', 'br', 'org', 'net',
    
    // Preposições e artigos
    'para', 'como', 'com', 'sem', 'por', 'pelo', 'pela', 'nos', 'nas', 'num', 'numa',
    'o', 'a', 'os', 'as', 'um', 'uma', 'uns', 'umas',
    
    // Conjunções
    'e', 'ou', 'mas', 'porque', 'pois', 'que', 'quando', 'onde', 'quem',
    
    // Pronomes
    'ele', 'ela', 'eles', 'elas', 'eu', 'nós', 'você', 'vocês',
    
    // Palavras comuns em HTML/Markdown
    'strong', 'em', 'p', 'div', 'span', 'class', 'href', 'src', 'alt', 'title',
    
    // Outras palavras comuns
    'este', 'esta', 'estes', 'estas', 'aquele', 'aquela', 'aqueles', 'aquelas',
    'isso', 'isto', 'aquilo', 'tudo', 'nada', 'algo', 'cada', 'qual', 'quais',
    'qualquer', 'quaisquer', 'tanto', 'tanta', 'tantos', 'tantas',
    'muito', 'muita', 'muitos', 'muitas', 'pouco', 'pouca', 'poucos', 'poucas',
    'todo', 'toda', 'todos', 'todas', 'nenhum', 'nenhuma', 'nenhuns', 'nenhumas'
]);

/**
 * Remove caracteres especiais e converte para minúsculas
 * @param {string} text 
 * @returns {string}
 */
function cleanText(text) {
    return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s]/g, ' ');
}

/**
 * Limpa uma palavra removendo caracteres especiais e normalizando
 * @param {string} word 
 * @returns {string}
 */
function cleanWord(word) {
    return word
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Remove acentos
        .replace(/['"`´]/g, '') // Remove aspas
        .replace(/[.,;:!?()[\]{}]/g, '') // Remove pontuação
        .replace(/[^a-z0-9]/g, '') // Remove qualquer outro caractere não alfanumérico
        .trim();
}

/**
 * Limpa e formata uma URL
 * @param {string} url 
 * @returns {string}
 */
function cleanUrl(url) {
    return url
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Remove acentos
        .replace(/[^a-z0-9\-_/]/g, '') // Mantém apenas letras, números, hífen, underscore e barra
        .replace(/\/+/g, '/') // Remove barras duplicadas
        .replace(/\/$/, ''); // Remove barra no final
}

/**
 * Limpa e formata um título
 * @param {string} title 
 * @returns {string}
 */
function cleanTitle(title) {
    return title
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Remove acentos
        .replace(/['"`´]/g, '') // Remove aspas
        .replace(/[.,;:!?()[\]{}]/g, '') // Remove pontuação
        .trim();
}

/**
 * Extrai palavras únicas de um texto
 * @param {string} text 
 * @returns {string[]}
 */
function extractWords(text) {
    return text
        .split(/\s+/)
        .map(cleanWord) // Limpa cada palavra
        .filter(word => word.length >= 4)
        .filter(word => !/^\d+$/.test(word)) // Remove números
        .filter(word => !STOP_WORDS.has(word)); // Remove palavras da lista de stop words
}

/**
 * Gera o índice de pesquisa em JSON
 * @returns {Promise<void>}
 */
export async function generateSearchIndex() {
    try {
        const posts = await readMarkdownFiles();
        const baseUrl = 'https://garagemdomadeira.com.br';
        const searchIndex = [];

        for (const post of posts) {
            // Limpa e extrai palavras do conteúdo
            const cleanContent = cleanText(post.content);
            const words = extractWords(cleanContent);
            
            // Limpa e extrai palavras do título
            const cleanTitle = cleanTitle(post.title);
            const titleWords = extractWords(cleanTitle);
            
            // Limpa e extrai palavras das tags e categorias
            const tags = post.tags || [];
            const categories = post.categories || [];
            const metaWords = [...tags, ...categories].map(cleanText).flatMap(extractWords);

            // Conta frequência das palavras
            const wordScores = new Map();

            // Processa palavras do conteúdo (1 ponto cada)
            words.forEach(word => {
                wordScores.set(word, (wordScores.get(word) || 0) + 1);
            });

            // Adiciona pontos para palavras do título (10 pontos cada)
            titleWords.forEach(word => {
                wordScores.set(word, (wordScores.get(word) || 0) + 10);
            });

            // Adiciona pontos para palavras das tags/categorias (5 pontos cada)
            metaWords.forEach(word => {
                wordScores.set(word, (wordScores.get(word) || 0) + 5);
            });

            // Agrupa palavras por pontuação
            const wordsByScore = new Map();
            for (const [word, score] of wordScores.entries()) {
                if (!wordsByScore.has(score)) {
                    wordsByScore.set(score, new Set());
                }
                wordsByScore.get(score).add(word);
            }

            // Converte para o formato desejado
            const wordsObject = {};
            for (const [score, words] of wordsByScore.entries()) {
                wordsObject[score] = Array.from(words).join('|');
            }

            // Adiciona ao índice como array
            searchIndex.push([
                cleanUrl(`${baseUrl}/posts/${post.slug}`),
                cleanTitle(post.title),
                wordsObject
            ]);
        }

        // Salva o arquivo JSON
        await fs.writeFile(
            path.join('output', 'search-index.json'),
            JSON.stringify(searchIndex, null, 2),
            'utf-8'
        );

        console.log('🔍 Índice de pesquisa gerado com sucesso!');
    } catch (error) {
        console.error('❌ Erro ao gerar índice de pesquisa:', error);
        throw error;
    }
} 
