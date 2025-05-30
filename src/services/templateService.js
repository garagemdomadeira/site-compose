/**
 * Serviço de template
 * Este arquivo é responsável por renderizar os templates do site
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const templatesDir = path.join(__dirname, '../../templates');

/**
 * Lê o conteúdo de um arquivo de template
 * @param {string} templateName 
 * @returns {Promise<string>}
 */
async function readTemplate(templateName) {
    const templatePath = path.join(templatesDir, templateName);
    return await fs.readFile(templatePath, 'utf-8');
}

/**
 * Processa um template com os dados fornecidos
 * @param {string} template 
 * @param {Object} data 
 * @returns {Promise<string>}
 */
async function processTemplate(template, data) {
    // Processa extends no formato {% extends "base.html" %}
    const extendsMatch = template.match(/\{%\s*extends\s+"([^"]+)"\s*%\}/);
    if (extendsMatch) {
        const baseTemplate = await readTemplate(extendsMatch[1]);
        const baseContent = await processTemplate(baseTemplate, data);
        
        // Processa blocos do template filho
        const blocks = {};
        template.replace(/\{%\s*block\s+([^%]+)\s*%\}([\s\S]*?)\{%\s*endblock\s*%\}/g, (match, blockName, content) => {
            blocks[blockName] = content;
            return '';
        });

        // Substitui blocos no template base
        return baseContent.replace(/\{%\s*block\s+([^%]+)\s*%\}([\s\S]*?)\{%\s*endblock\s*%\}/g, (match, blockName) => {
            return blocks[blockName] || '';
        });
    }

    // Processa includes no formato {% include "arquivo.html" %}
    let result = template;
    const includeRegex = /\{%\s*include\s+"([^"]+)"\s*%\}/g;
    let includeMatch;
    
    while ((includeMatch = includeRegex.exec(template)) !== null) {
        const includeFile = includeMatch[1];
        const includePath = path.join(templatesDir, includeFile);
        try {
            const includeContent = await fs.readFile(includePath, 'utf-8');
            result = result.replace(includeMatch[0], includeContent);
        } catch (error) {
            console.error(`Erro ao incluir arquivo ${includeFile}:`, error);
            result = result.replace(includeMatch[0], '');
        }
    }

    // Processa loops no formato {% for item in array %} ... {% endfor %}
    result = result.replace(/\{%\s*for\s+(\w+)\s+in\s+([^%]+)\s*%\}([\s\S]*?)\{%\s*endfor\s*%\}/g, (match, itemName, arrayPath, content) => {
        const array = arrayPath.split('.').reduce((obj, key) => obj?.[key], data);
        if (!Array.isArray(array)) return '';

        return array.map(item => {
            let itemContent = content;
            // Substitui variáveis do item no formato {{ item.propriedade }}
            itemContent = itemContent.replace(/\{\{([^}]+)\}\}/g, (match, key) => {
                const propPath = key.trim().split('.');
                if (propPath[0] === itemName) {
                    return propPath.slice(1).reduce((obj, key) => obj?.[key], item) || '';
                }
                return data[key.trim()] || '';
            });
            return itemContent;
        }).join('');
    });

    // Substitui variáveis no formato {{ variavel }}
    result = result.replace(/\{\{([^}]+)\}\}/g, (match, key) => {
        key = key.trim();
        return data[key] || '';
    });

    // Processa blocos condicionais no formato {% if condicao %} ... {% endif %}
    result = result.replace(/\{%\s*if\s+([^%]+)\s*%\}([\s\S]*?)\{%\s*endif\s*%\}/g, (match, condition, content) => {
        const [key, operator, value] = condition.trim().split(/\s+/);
        const dataValue = data[key];

        if (operator === 'and') {
            return dataValue && value ? content : '';
        } else if (operator === 'or') {
            return dataValue || value ? content : '';
        } else {
            return dataValue ? content : '';
        }
    });

    return result;
}

/**
 * Renderiza um template com os dados fornecidos
 * @param {string} templateName 
 * @param {Object} data 
 * @returns {Promise<string>}
 */
export async function renderTemplate(templateName, data = {}) {
    try {
        const template = await readTemplate(templateName);
        return await processTemplate(template, data);
    } catch (error) {
        console.error(`Erro ao renderizar template ${templateName}:`, error);
        throw error;
    }
} 
