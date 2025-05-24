import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import nunjucks from 'nunjucks';

// Configuração de diretórios
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const outputDir = path.join(rootDir, 'output');
const structuresDir = path.join(rootDir, 'structures');
const templatesDir = path.join(rootDir, 'templates');

// Configuração do Nunjucks
nunjucks.configure(templatesDir, {
    autoescape: true,
    noCache: true
});

// Função para limpar a pasta output
async function cleanOutput() {
    try {
        await fs.rm(outputDir, { recursive: true, force: true });
        await fs.mkdir(outputDir);
        console.log('✅ Pasta output limpa com sucesso');
    } catch (error) {
        console.error('❌ Erro ao limpar pasta output:', error);
        throw error;
    }
}

// Função para ler a estrutura JSON
async function readStructure(page) {
    try {
        const structure = await fs.readFile(path.join(structuresDir, `${page}.json`), 'utf-8');
        console.log(`✅ Estrutura ${page}.json carregada com sucesso`);
        return JSON.parse(structure);
    } catch (error) {
        console.error(`❌ Erro ao ler estrutura ${page}.json:`, error);
        throw error;
    }
}

// Função para ler o menu
async function readMenu() {
    try {
        const menu = await fs.readFile(path.join(structuresDir, 'menu.json'), 'utf-8');
        console.log('✅ Menu carregado com sucesso');
        return JSON.parse(menu);
    } catch (error) {
        console.error('❌ Erro ao ler menu:', error);
        throw error;
    }
}

// Função para copiar arquivos estáticos
async function copyStaticFiles() {
    try {
        // Cria a pasta assets no output
        const outputAssetsDir = path.join(outputDir, 'assets');
        await fs.mkdir(outputAssetsDir, { recursive: true });

        // Copia o arquivo CSS
        await fs.copyFile(
            path.join(rootDir, 'src', 'assets', 'styles.css'),
            path.join(outputAssetsDir, 'styles.css')
        );
        console.log('✅ Arquivos estáticos copiados com sucesso');
    } catch (error) {
        console.error('❌ Erro ao copiar arquivos estáticos:', error);
        throw error;
    }
}

// Função para gerar a página inicial
async function generateHomePage() {
    try {
        // Limpa a pasta output
        await cleanOutput();

        // Copia os arquivos estáticos
        await copyStaticFiles();

        // Lê a estrutura da home e o menu
        const [homeStructure, menu] = await Promise.all([
            readStructure('home'),
            readMenu()
        ]);

        // Combina os dados da home com o menu
        const pageData = {
            ...homeStructure,
            menu
        };

        // Renderiza o template base.html com os dados combinados
        const html = nunjucks.render('base.html', pageData);
        await fs.writeFile(path.join(outputDir, 'index.html'), html);
        console.log('✅ Página inicial gerada com sucesso');
    } catch (error) {
        console.error('❌ Erro ao gerar página inicial:', error);
        throw error;
    }
}

// Função principal
async function main() {
    try {
        console.log('🚀 Iniciando geração de páginas...');
        await generateHomePage();
        console.log('✨ Geração de páginas concluída com sucesso!');
    } catch (error) {
        console.error('❌ Erro durante a geração de páginas:', error);
        process.exit(1);
    }
}

// Executa o programa
main();
