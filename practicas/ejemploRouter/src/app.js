import express from 'express';
import indexRouter from './routes/index.router';

const app = express();

// Middleware para analizar el cuerpo de las  solicitudes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(8080, () => {
    console.log("El servidor se encuentra escuchando en el puerto 8080")
});


//implementando router
app.use('/', indexRouter);  // agrupo todos los metodos relacionados a inicio e informativos
app.use('/api/product', productRouter);
app.use('/api/user', userRouter);

