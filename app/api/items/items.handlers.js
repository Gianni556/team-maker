import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, 'data');


export const itemsHandlers = {

  getAll: () => {
    const files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.json'));

    return files.map(file => {
      return JSON.parse(fs.readFileSync(path.join(DATA_DIR, file), 'utf-8'));
    });
  },
  addItem: (name) => {
    const id = crypto.randomUUID();
    const item = { id, name };

    fs.writeFileSync(path.join(DATA_DIR, `${id}.json`), JSON.stringify(item, null, 2));

    return getById(id);
  },

  deleteItem: (id) => {
    const filePath = path.join(DATA_DIR, `${id}.json`);

    if (!fs.existsSync(filePath)) return null;

    fs.unlinkSync(filePath);
    return true;
  }
}

