# Garagem do Madeira - Gerador de Site Estático

Este é um projeto pessoal de um gerador de arquivos HTML bem simples baseado em arquivos Markdown. O propósito principal é gerenciar o conteúdo do site [garagemdomadeira.com](https://garagemdomadeira.com), mas o código fonte está disponível para qualquer pessoa que queira usar.

## 📋 Sobre o Projeto

Este gerador de site estático foi desenvolvido para transformar arquivos Markdown em páginas HTML completas. Ele é especialmente focado em conteúdo automotivo, mas pode ser adaptado para qualquer tipo de conteúdo.

### ⚠️ Importante sobre o Conteúdo

**O conteúdo dos arquivos Markdown é de minha autoria e está protegido por direitos autorais.** Embora o código fonte do gerador esteja disponível para uso, todo o conteúdo textual dos posts em `content/post/` foi escrito por mim e não deve ser copiado ou reproduzido sem autorização.

## 🚀 Funcionalidades

- **Geração de páginas HTML** a partir de arquivos Markdown
- **Sistema de categorias e tags** para organização do conteúdo
- **Página de busca** com índice de pesquisa
- **Sitemap automático** para SEO
- **Suporte a imagens** com cópia automática para output
- **Templates personalizáveis** usando EJS e Nunjucks
- **Servidor de desenvolvimento** com hot reload
- **Sistema de menu** configurável via JSON

## 📁 Estrutura do Projeto

```
garagem_do_madeira/
├── content/                 # Conteúdo em Markdown
│   └── post/               # Posts do blog
├── media/                  # Imagens e mídia
├── src/                    # Código fonte do gerador
│   ├── generators/         # Geradores de páginas
│   ├── services/          # Serviços auxiliares
│   ├── utils/             # Utilitários
│   └── index.js           # Ponto de entrada
├── templates/             # Templates HTML
├── structures/            # Configurações de estrutura
├── output/                # Arquivos gerados (não versionado)
└── package.json           # Dependências e scripts
```

## 🛠️ Instalação e Uso

### Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn

### Instalação

1. Clone o repositório:
```bash
git clone [URL_DO_REPOSITORIO]
cd garagem_do_madeira
```

2. Instale as dependências:
```bash
npm install
```

### Scripts Disponíveis

- `npm start` - Gera o site completo
- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Gera o site para produção
- `npm run watch` - Monitora mudanças e reconstrói automaticamente
- `npm run deploy` - Executa script de deploy
- `npm run normalize-tags` - Normaliza tags dos posts

## 📝 Como Usar

### 1. Criando um Post

Crie um arquivo `.md` na pasta `content/post/` com o seguinte formato:

```markdown
---
title: "Título do Post"
date: "2024-01-01"
categories: ["categoria1", "categoria2"]
tags: ["tag1", "tag2"]
image: "nome-da-imagem.jpg"
excerpt: "Resumo do post..."
---

Conteúdo do post em Markdown...
```

### 2. Adicionando Imagens

Coloque as imagens na pasta `media/` e referencie-as no frontmatter do post ou no conteúdo Markdown.

### 3. Personalizando Templates

Os templates estão em `templates/` e podem ser modificados para alterar a aparência do site.

## 🔧 Configuração

### Estruturas

Os arquivos em `structures/` definem a estrutura do site:
- `home.json` - Configuração da página inicial
- `menu.json` - Configuração do menu de navegação
- `post.json` - Configuração dos posts

### Templates

Os templates usam EJS e Nunjucks para renderização. Você pode personalizar:
- `base.html` - Template base
- `components/` - Componentes reutilizáveis
- Páginas específicas em `templates/`

## 📄 Licença

- **Código fonte**: Disponível para uso livre
- **Conteúdo textual**: Todos os direitos reservados - conteúdo de minha autoria

## 🤝 Contribuições

Contribuições para melhorar o gerador são bem-vindas! Por favor, abra uma issue ou pull request para:
- Correções de bugs
- Melhorias no gerador
- Novas funcionalidades
- Melhorias na documentação

**Lembre-se**: O conteúdo dos posts não deve ser modificado sem autorização.

## 📞 Contato

Para questões sobre o gerador ou solicitações de uso do conteúdo:
- Site: [garagemdomadeira.com](https://garagemdomadeira.com)

---

**Nota**: Este projeto é mantido como uma ferramenta pessoal para gerenciar meu site automotivo. O foco principal é o conteúdo, mas o gerador está disponível para a comunidade. 
