import express from 'express';
import handlebars from 'express-handlebars';   // motor de plantillas para conectar
import __dirname from './utils.js';
import mongoose from 'mongoose';   // para conectarme a la base de datos MongoDB
import { config } from './config/config.js';  // variable que almacena la variable de entorno

// importacion de los routers
import viewsRouter from './routes/views.router.js';
import productRouter from './routes/product.router.js';

const app = express();  // inicializo la constante app para usar express

// configuro el servidor
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

//inicializo mi motor de plantillas y lo configuro
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

// seteo de manera estatica la carpeta public
app.use(express.static(__dirname + '/public'));

// conexion a la Base de datos
mongoose.connect(config.URL_MONGODB)
    .then(() => console.log('Connection successfully established'))
    .catch( (error) => {
        console.log('Error connection', error);
        process.exit();
    });

app.listen(config.PORT, ()=> console.log(`Listening on port ${config.PORT}`));

// implemento los routers
app.use('/', viewsRouter);   // para todas las vistas. lo devuelvo con res.render
app.use('/product', productRouter);   // voy a tener las operacion CRUD pero con renderizaciones


