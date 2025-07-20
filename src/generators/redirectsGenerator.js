import fs from 'fs';
import path from 'path';
import { readStructure } from '../services/structureService.js';

export async function generate() {
    try {
        // Carrega a estrutura de redirecionamentos
        const redirectsStructure = await readStructure('redirects');
        
        // Prepara o conteúdo do arquivo _redirects
        const redirectsContent = redirectsStructure.redirects
            .map(redirect => `${redirect.from}    ${redirect.to}    ${redirect.status}`)
            .join('\n');

        // Escreve o arquivo _redirects na pasta output
        const outputPath = path.join(process.cwd(), 'output', '_redirects');
        fs.writeFileSync(outputPath, redirectsContent);

        console.log('Arquivo _redirects gerado com sucesso!');
    } catch (error) {
        console.error('Erro ao gerar arquivo _redirects:', error);
    }
} 
