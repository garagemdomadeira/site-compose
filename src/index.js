import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import nunjucks from 'nunjucks';
import { marked } from 'marked';

// Configuração de diretórios
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const outputDir = path.join(rootDir, 'output');
const structuresDir = path.join(rootDir, 'structures');
const templatesDir = path.join(rootDir, 'templates');
const contentDir = path.join(rootDir, 'content', 'post');
const mediaDir = path.join(rootDir, 'media');

// Configuração do Nunjucks
const env = nunjucks.configure(templatesDir, {
    autoescape: true,
    noCache: true
});

// Adiciona filtro de data
env.addFilter('date', function(str, format) {
    const date = new Date();
    return date.getFullYear().toString();
});

// Função para extrair metadados do frontmatter do Markdown
function extractFrontmatter(content) {
    const frontmatterRegex = /^---\n([\s\S]*?)\n---/;
    const match = content.match(frontmatterRegex);
    
    if (match) {
        const frontmatter = match[1];
        const metadata = {};
        
        frontmatter.split('\n').forEach(line => {
            const [key, ...values] = line.split(':');
            if (key && values.length > 0) {
                metadata[key.trim()] = values.join(':').trim();
            }
        });
        
        // Garante que a data está no formato correto
        if (metadata.date) {
            const date = new Date(metadata.date);
            metadata.year = date.getFullYear().toString();
            metadata.month = (date.getMonth() + 1).toString().padStart(2, '0');
        }
        
        return {
            metadata,
            content: content.slice(match[0].length).trim()
        };
    }
    
    return {
        metadata: {},
        content
    };
}

// Função para encontrar imagem na pasta media
async function findImageInMedia(imageName) {
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

// Função para copiar imagens do post
async function copyPostImages(content, outputPath) {
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

// Função para ler todos os arquivos Markdown
async function readMarkdownFiles() {
    try {
        const files = await fs.readdir(contentDir);
        const markdownFiles = files.filter(file => file.endsWith('.md'));
        const posts = await Promise.all(
            markdownFiles.map(async file => {
                const content = await fs.readFile(path.join(contentDir, file), 'utf-8');
                const { metadata, content: markdownContent } = extractFrontmatter(content);
                const html = marked(markdownContent);
                
                return {
                    ...metadata,
                    content: html,
                    slug: path.basename(file, '.md')
                };
            })
        );
        console.log(`✅ ${posts.length} arquivos Markdown carregados com sucesso`);
        return posts;
    } catch (error) {
        console.error('❌ Erro ao ler arquivos Markdown:', error);
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

        // Renderiza o template home.html com os dados combinados
        const html = nunjucks.render('home.html', pageData);
        await fs.writeFile(path.join(outputDir, 'index.html'), html);
        console.log('✅ Página inicial gerada com sucesso');
    } catch (error) {
        console.error('❌ Erro ao gerar página inicial:', error);
        throw error;
    }
}

// Função para gerar páginas de conteúdo
async function generateContentPages() {
    try {
        const posts = await readMarkdownFiles();
        const menu = await readMenu();

        for (const post of posts) {
            const pageData = {
                ...post,
                menu
            };

            // Cria a estrutura de diretórios ano/mês/post
            const postDir = path.join(outputDir, post.year, post.month, post.slug);
            await fs.mkdir(postDir, { recursive: true });

            // Copia as imagens do post
            await copyPostImages(post.content, postDir);

            // Renderiza o template de conteúdo
            const html = nunjucks.render('content.html', pageData);
            await fs.writeFile(path.join(postDir, 'index.html'), html);
            console.log(`✅ Página ${post.year}/${post.month}/${post.slug} gerada com sucesso`);
        }
    } catch (error) {
        console.error('❌ Erro ao gerar páginas de conteúdo:', error);
        throw error;
    }
}

// Função principal
async function main() {
    try {
        console.log('🚀 Iniciando geração de páginas...');
        await generateHomePage();
        await generateContentPages();
        console.log('✨ Geração de páginas concluída com sucesso!');
    } catch (error) {
        console.error('❌ Erro durante a geração de páginas:', error);
        process.exit(1);
    }
}

// Executa o programa
main();
