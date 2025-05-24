/**
 * Verifica se um arquivo existe.
 * @param {string} filePath - Caminho absoluto do arquivo
 * @returns {Promise<boolean>} true se existe, false se não
 */
import fs from 'fs/promises';

export async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
} 
