/**
 * Concentrador de serviços de arquivo.
 * Este módulo exporta todas as funções relacionadas a manipulação de arquivos,
 * servindo como ponto central de acesso aos serviços.
 */

export { cleanOutput } from './cleanOutput.js';
export { readStructure, readMenu } from './structureService.js';
export { readMarkdownFiles } from './contentService.js';
export { copyStaticFiles } from './staticService.js';
export { ensureDirectoryExists } from './directoryService.js';
