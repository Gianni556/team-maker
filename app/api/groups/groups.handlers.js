import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, 'data');

export const groupsHandlers = {
    getAll: async () => {
        const files = await fs.readdir(DATA_DIR);
        const jsonFiles = files.filter(file => file.endsWith('.json'));
        const arrPromises = jsonFiles.map(async (file) => {
            const content = await fs.readFile(path.join(DATA_DIR, file), 'utf-8');
            return JSON.parse(content);
        })
        
        return await Promise.all(arrPromises);
    }
}