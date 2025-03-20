import path from 'path';
import { fileURLToPath } from 'url';

// Convertir import.meta.url en __filename y __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export { __filename, __dirname };