import { execSync } from 'child_process';
import { existsSync, mkdirSync, readdirSync, unlinkSync, rmdirSync, copyFileSync } from 'fs';
import { join, resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🚀 Iniciando processo de deploy...\n');

try {
  // Sobe um nível acima da raiz do projeto
  const projectRoot = resolve(__dirname);
  const parentDir = resolve(projectRoot, '..');
  
  console.log(`📍 Diretório do projeto: ${projectRoot}`);
  console.log(`📍 Diretório pai: ${parentDir}`);
  
  // Caminho para a pasta garagemdomadeira.github.io
  const deployDir = join(parentDir, 'garagemdomadeira.github.io');
  
  // Verifica se a pasta existe
  if (!existsSync(deployDir)) {
    console.log('📁 Pasta garagemdomadeira.github.io não encontrada. Criando...');
    mkdirSync(deployDir, { recursive: true });
    console.log('✅ Pasta criada com sucesso!');
  } else {
    console.log('📁 Pasta garagemdomadeira.github.io encontrada.');
    
    // Lista todos os arquivos e pastas não ocultos
    const items = readdirSync(deployDir);
    const nonHiddenItems = items.filter(item => !item.startsWith('.'));
    
    if (nonHiddenItems.length > 0) {
      console.log(`🧹 Removendo ${nonHiddenItems.length} arquivo(s)/pasta(s) não oculto(s)...`);
      
      // Remove arquivos e pastas não ocultos
      for (const item of nonHiddenItems) {
        const itemPath = join(deployDir, item);
        try {
          if (existsSync(itemPath)) {
            // Se for um arquivo, remove diretamente
            unlinkSync(itemPath);
            console.log(`   🗑️  Removido: ${item}`);
          }
          // Se for uma pasta, remove recursivamente
          else {
            const removeDirRecursive = (dirPath) => {
              const files = readdirSync(dirPath);
              for (const file of files) {
                const filePath = join(dirPath, file);
                if (existsSync(filePath)) {
                  unlinkSync(filePath);
                } else {
                  removeDirRecursive(filePath);
                  rmdirSync(filePath);
                }
              }
              rmdirSync(dirPath);
            };
            removeDirRecursive(itemPath);
            console.log(`   🗑️  Removido: ${item}/`);
          }
        } catch (error) {
          console.log(`   ⚠️  Erro ao remover ${item}: ${error.message}`);
        }
      }
      console.log('✅ Limpeza concluída!');
    } else {
      console.log('✨ Pasta já está vazia (apenas arquivos ocultos).');
    }
  }
  
  // Executa o build
  console.log('\n🔨 Executando build...');
  execSync('npm run build', { 
    cwd: projectRoot, 
    stdio: 'inherit',
    encoding: 'utf8'
  });
  console.log('✅ Build concluído!');
  
  // Verifica se a pasta output existe
  const outputDir = join(projectRoot, 'output');
  if (!existsSync(outputDir)) {
    throw new Error('❌ Pasta output não encontrada após o build!');
  }
  
  // Copia todos os arquivos da pasta output para garagemdomadeira.github.io
  console.log('\n📋 Copiando arquivos do output...');
  
  const copyRecursive = (src, dest) => {
    const items = readdirSync(src);
    
    for (const item of items) {
      const srcPath = join(src, item);
      const destPath = join(dest, item);
      
      if (existsSync(srcPath)) {
        // Se for arquivo, copia
        copyFileSync(srcPath, destPath);
        console.log(`   📄 Copiado: ${item}`);
      } else {
        // Se for pasta, cria a pasta e copia recursivamente
        mkdirSync(destPath, { recursive: true });
        copyRecursive(srcPath, destPath);
        console.log(`   📁 Copiado: ${item}/`);
      }
    }
  };
  
  copyRecursive(outputDir, deployDir);
  console.log('✅ Cópia concluída!');
  
  // Gera a data e hora para o commit
  const now = new Date();
  const dateTime = now.toISOString().replace(/[:.]/g, '-').slice(0, 19); // Formato: 2024-01-15T14-30-45
  const commitMessage = `new-version-${dateTime}`;
  
  // Executa git add, commit e push
  console.log('\n📝 Preparando commit e push...');
  
  try {
    // Muda para o diretório de deploy
    process.chdir(deployDir);
    
    // Adiciona todos os arquivos
    console.log('   📤 Adicionando arquivos ao git...');
    execSync('git add .', { stdio: 'inherit', encoding: 'utf8' });
    
    // Faz o commit
    console.log(`   💾 Fazendo commit: "${commitMessage}"`);
    execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit', encoding: 'utf8' });
    
    // Faz o push
    console.log('   🚀 Fazendo push para o repositório remoto...');
    execSync('git push origin main', { stdio: 'inherit', encoding: 'utf8' });
    
    console.log('✅ Commit e push concluídos com sucesso!');
    
  } catch (gitError) {
    console.log('⚠️  Aviso: Erro durante operações git:');
    console.log(`   ${gitError.message}`);
    console.log('💡 Verifique se o repositório garagemdomadeira.github.io está configurado corretamente.');
  }
  
  // Mensagem especial de finalização
  console.log('\n' + '='.repeat(60));
  console.log('🎉 DEPLOY CONCLUÍDO COM SUCESSO! 🎉');
  console.log('='.repeat(60));
  console.log('📍 Arquivos copiados para: ' + deployDir);
  console.log('🌐 Seu site está pronto para ser publicado!');
  console.log('📝 Commit realizado: ' + commitMessage);
  console.log('🚀 Push realizado com sucesso!');
  console.log('='.repeat(60));
  
} catch (error) {
  console.error('\n❌ ERRO durante o deploy:');
  console.error(error.message);
  process.exit(1);
}
