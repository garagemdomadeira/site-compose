import { jest } from '@jest/globals';
import fs from 'fs/promises';
import path from 'path';
import { readStructure, readMenu } from '../../src/services/structureService.js';

// Mock dos módulos
jest.mock('fs/promises', () => ({
    readFile: jest.fn()
}));

jest.mock('../../src/utils/config.js', () => ({
    structuresDir: '/mock/structures'
}));

describe('structureService', () => {
    beforeEach(() => {
        // Limpa todos os mocks antes de cada teste
        jest.clearAllMocks();
    });

    describe('readStructure', () => {
        it('deve ler e parsear um arquivo de estrutura corretamente', async () => {
            // Arrange
            const page = 'home';
            const mockStructure = {
                title: 'Home',
                sections: ['header', 'main', 'footer']
            };
            fs.readFile.mockResolvedValue(JSON.stringify(mockStructure));

            // Act
            const result = await readStructure(page);

            // Assert
            expect(result).toEqual(mockStructure);
            expect(fs.readFile).toHaveBeenCalledWith(
                path.join('/mock/structures', 'home.json'),
                'utf-8'
            );
        });

        it('deve lançar erro quando o arquivo não existe', async () => {
            // Arrange
            const page = 'nonexistent';
            const error = new Error('Arquivo não encontrado');
            fs.readFile.mockRejectedValue(error);

            // Act & Assert
            await expect(readStructure(page)).rejects.toThrow('Arquivo não encontrado');
        });

        it('deve lançar erro quando o JSON é inválido', async () => {
            // Arrange
            const page = 'invalid';
            fs.readFile.mockResolvedValue('invalid json');

            // Act & Assert
            await expect(readStructure(page)).rejects.toThrow();
        });
    });

    describe('readMenu', () => {
        it('deve ler e parsear o arquivo de menu corretamente', async () => {
            // Arrange
            const mockMenu = {
                items: [
                    { label: 'Home', url: '/' },
                    { label: 'Sobre', url: '/sobre' }
                ]
            };
            fs.readFile.mockResolvedValue(JSON.stringify(mockMenu));

            // Act
            const result = await readMenu();

            // Assert
            expect(result).toEqual(mockMenu);
            expect(fs.readFile).toHaveBeenCalledWith(
                path.join('/mock/structures', 'menu.json'),
                'utf-8'
            );
        });

        it('deve lançar erro quando o arquivo de menu não existe', async () => {
            // Arrange
            const error = new Error('Arquivo não encontrado');
            fs.readFile.mockRejectedValue(error);

            // Act & Assert
            await expect(readMenu()).rejects.toThrow('Arquivo não encontrado');
        });

        it('deve lançar erro quando o JSON do menu é inválido', async () => {
            // Arrange
            fs.readFile.mockResolvedValue('invalid json');

            // Act & Assert
            await expect(readMenu()).rejects.toThrow();
        });
    });
}); 
