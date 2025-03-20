import express from 'express';
import multer from 'multer';

const app = express();
const PORT = 8080;

// Configuro Multer para guardar archivos en la carpeta 'uploads'
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

// Ruta para subir archivos
app.post('/upload', upload.single('file'), (req, res) => {
    res.json({ message: 'Archivo subido exitosamente', file: req.file });
});

// Servidor corriendo en el puerto 8080
app.listen(8080, () => console.log('Servidor corriendo en el puerto 8080'));