import express from 'express';

const PORT = 8080;

// creo una instancia de express
const app = express();

// middleware a nivel de aplicacion
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);  // en consola se mostrara 1 fecha 2 metodo 3 ruta

    next(); // continuo con la siguiente funcion

});

// creo una ruta de prueba
app.get('/', (req, res) => {
    res.send('Middleware de Logger');
});

app.listen(8080, () => console.log(`Listening on port ${PORT}`));  // mensaje de escucha del puerto