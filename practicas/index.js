import express from 'express';
import logger from './middlewares/logger.js';
import errorHandler from './middlewares/errorHandler.js';
import validateUser from './middlewares/validateUser.js';
import routerMiddleware from './middlewares/routerMiddleware.js';
import uploadMiddleware from './middlewares/uploadMiddleware.js';

const app = express();

// Middlewares globales
app.use(logger);
app.use(validateUser);
app.use(routerMiddleware);
app.use(uploadMiddleware);

// Rutas de prueba
app.get('/', (req, res) => {
    res.send('Middleware funcionando correctamente');
});

// Middleware de manejo de errores
app.use(errorHandler);

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});