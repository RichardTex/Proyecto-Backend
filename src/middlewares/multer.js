import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url'

// para obtener __dirname en ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// configuración del almacenamiento con Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/img')); // Carpeta donde se guardaran las imagenes
    },
    filename: function (req, file, cb) {
        const timestamp = Date.now(); // Agregar timestamp al nombre del archivo
        cb(null, `${timestamp}-${file.originalname}`); // Nombre final del archivo
    }
});

// exportamos el middleware
const upload = multer({ storage });
export default upload;