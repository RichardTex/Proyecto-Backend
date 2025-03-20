import express from 'express';

const PORT = 8080;

const app = express();
app.use(express.json());

// Middleware para manejar errores
const errorHandler = (err, req, res, next) => {
    console.error('Error detectado:', err.message);
    res.status(500).json({ error: 'Algo salió mal en el servidor' });
};

// Ruta de prueba que genera un error
app.get('/error', (req, res, next) => {
    const error = new Error('Esto es un error forzado');
    next(error);
});

// Uso del middleware de manejo de errores
app.use(errorHandler);

app.listen(8080, () => console.log('Servidor corriendo en el puerto 8080'));