import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import path from 'path';
import viewsRouter from './routes/views.router.js';
import userRouter from './routes/user.router.js';

const app = express();
const PORT = 8080;  // puerto 8080

// middleware para analizar datos en formato JSON y urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// para acceder a los archivo estaticos de public
app.use(express.static(path.join(__dirname, 'public')));

// inicializamos el motor indicando con app.engine("Que motor utilizaremos", el motor instanciado)
app.engine('handlebars', handlebars.engine());   // seteando que el motor de plantillas, es un metodo que nos devuelve el motor
app.set('views', __dirname + '/views');  // indico en que parte del proyecto estaran las vistas para setearlas
app.set('view engine', 'handlebars');  // indico que el motor indicado arriba es el que quiero utilizar

app.use('/', viewsRouter);

app.use('/api/user', userRouter);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);  // mensaje de escucha del puerto
});

