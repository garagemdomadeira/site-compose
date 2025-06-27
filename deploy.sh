#!/bin/bash

# Script de Deploy para Garagem do Madeira
# Este script automatiza o processo de deploy do site

set -e  # Para o script se qualquer comando falhar

echo "🚀 Iniciando processo de deploy..."
echo ""

# Obtém o diretório do script
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$SCRIPT_DIR"
PARENT_DIR="$(dirname "$PROJECT_ROOT")"

echo "📍 Diretório do projeto: $PROJECT_ROOT"
echo "📍 Diretório pai: $PARENT_DIR"

# Caminho para a pasta garagemdomadeira.github.io
DEPLOY_DIR="$PARENT_DIR/garagemdomadeira.github.io"

# Verifica se a pasta existe
if [ ! -d "$DEPLOY_DIR" ]; then
    echo "📁 Pasta garagemdomadeira.github.io não encontrada. Criando..."
    mkdir -p "$DEPLOY_DIR"
    echo "✅ Pasta criada com sucesso!"
else
    echo "📁 Pasta garagemdomadeira.github.io encontrada."
    
    # Conta arquivos não ocultos
    NON_HIDDEN_COUNT=$(find "$DEPLOY_DIR" -maxdepth 1 -not -name ".*" | wc -l)
    NON_HIDDEN_COUNT=$((NON_HIDDEN_COUNT - 1))  # Subtrai 1 para não contar o próprio diretório
    
    if [ $NON_HIDDEN_COUNT -gt 0 ]; then
        echo "🧹 Removendo $NON_HIDDEN_COUNT arquivo(s)/pasta(s) não oculto(s)..."
        
        # Remove arquivos e pastas não ocultos
        find "$DEPLOY_DIR" -maxdepth 1 -not -name ".*" -not -path "$DEPLOY_DIR" -exec rm -rf {} \;
        echo "✅ Limpeza concluída!"
    else
        echo "✨ Pasta já está vazia (apenas arquivos ocultos)."
    fi
fi

# Executa o build
echo ""
echo "🔨 Executando build..."
cd "$PROJECT_ROOT"
npm run build
echo "✅ Build concluído!"

# Verifica se a pasta output existe
OUTPUT_DIR="$PROJECT_ROOT/output"
if [ ! -d "$OUTPUT_DIR" ]; then
    echo "❌ Pasta output não encontrada após o build!"
    exit 1
fi

# Copia todos os arquivos da pasta output para garagemdomadeira.github.io
echo ""
echo "📋 Copiando arquivos do output..."

# Copia todos os arquivos e pastas recursivamente
cp -r "$OUTPUT_DIR"/* "$DEPLOY_DIR/"
echo "✅ Cópia concluída!"

# Gera a data e hora para o commit
NOW=$(date '+%Y-%m-%dT%H-%M-%S')
COMMIT_MESSAGE="new-version-$NOW"

# Executa git add, commit e push
echo ""
echo "📝 Preparando commit e push..."

# Muda para o diretório de deploy
cd "$DEPLOY_DIR"

# Verifica se é um repositório git
if [ ! -d ".git" ]; then
    echo "⚠️  Aviso: Diretório não é um repositório git."
    echo "💡 Inicializando repositório git..."
    git init
    echo "💡 Configure o remote origin antes de continuar:"
    echo "   git remote add origin https://github.com/garagemdomadeira/garagemdomadeira.github.io.git"
    exit 1
fi

# Adiciona todos os arquivos
echo "   📤 Adicionando arquivos ao git..."
git add .

# Faz o commit
echo "   💾 Fazendo commit: \"$COMMIT_MESSAGE\""
git commit -m "$COMMIT_MESSAGE"

# Faz o push
echo "   🚀 Fazendo push para o repositório remoto..."
git push origin main

echo "✅ Commit e push concluídos com sucesso!"

# Mensagem especial de finalização
echo ""
echo "============================================================"
echo "🎉 DEPLOY CONCLUÍDO COM SUCESSO! 🎉"
echo "============================================================"
echo "📍 Arquivos copiados para: $DEPLOY_DIR"
echo "🌐 Seu site está pronto para ser publicado!"
echo "📝 Commit realizado: $COMMIT_MESSAGE"
echo "🚀 Push realizado com sucesso!"
echo "============================================================" 
