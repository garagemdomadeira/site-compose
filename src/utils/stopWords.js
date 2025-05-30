/**
 * Lista de palavras a serem ignoradas no indexador de pesquisa
 * Estas palavras são muito comuns e não agregam valor à pesquisa
 */

export const STOP_WORDS = new Set([
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
