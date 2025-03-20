import express from 'express';
import userRouter from './routes/user.router.js';
import petRouter from './routes/pet.router.js';
import path from 'path';
import { __dirname } from './utils.js';

const app = express();

// Middleware para analizar el cuerpo de las solicitudes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(8080, () => {
    console.log("El servidor se encuentra escuchando en el puerto 8080")
});


// Implementando router creados
app.use('/api/pet', petRouter);
app.use('/api/user', userRouter);

// Para convertir nuestra carpeta public en recursos estaticos
app.use('/static', express.static(path.join(__dirname, '/public')));