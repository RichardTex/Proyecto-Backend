import express from 'express';  // importo express
import productsRouter from './routes/products.js';   // importo el router del producto
import cartsRouter from './routes/carts.js';   // importo el router del carrito
import path from 'path';  // importo path para trabajar con las rutas de los directorios
import logger from './middlewares/logger.js';   // Importo el middleware
import errorHandler from './middlewares/errorHandler.js';   // Importo el middleware de manejo de errores
import __dirname from './utils.js';    // Importo __dirname desde utils.js
import { engine } from 'express-handlebars'; // importo el motor de plantillas handlebarsa
import fs from 'fs';  // importo fs para leer archivos
import http from 'http';  // para crear el servidor HTTP
import { Server as SocketIOServer } from 'socket.io'; // para la conexion de WEBSOCKET

// hay que inicializar
const app = express(); // a partir de aqui app tendra todas las funcionalidades de express

const server = http.createServer(app);   // creo el servidor http con express
const io = new SocketIOServer(server);  // creo la conexion de socket.io con el servidor http

const PORT = 8080;  // puerto 8080

// Configuración de Handlebars
app.engine('handlebars', engine());

app.set('views', path.join(__dirname, 'views'));  // para que express sepa donde estan las vistas
app.set('view engine', 'handlebars');  // handlebar se la establece como un motor de plantillas

// para acceder a los archivo estaticos de public
app.use(express.static(path.join(__dirname, 'public')));

// middleware para analizar datos en formato JSON y urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware a nivel de aplicación
app.use(logger);

// rutas para handlebars
app.get('/products', (req, res) => {   // ruta para mostrar los productos
    fs.readFile(path.join(__dirname, 'data', 'products.json'), 'utf-8', (err, data) => {  // leo el archivo 'products.json' de la carpeta 'data'
        if (err) {
            return res.status(500).json({ error: 'Error reading products data' }); // retorno un 500
        }
        const products = JSON.parse(data);  // parseo el contenido de JSON

        res.render('home', { products });  // siempre se devuelve un res.render en handlebars: renderizo la vista "home" de los productos
    });
});

// Ruta para agregar un producto (en el backend)
app.post('/api/products', (req, res) => {
    const { title, price, description, code, stock, category, thumbnails } = req.body;

    if (!title || !price || !description || !stock || !category) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const newCode = code || 'P' + Date.now();  // genero un codigo unico si no se genera
    console.log('thumbnails from request:', thumbnails);
    const newThumbnails = thumbnails || [];   // si no se proporcionan thumbnails se asigna un array vacio

    // leo el archivo de productos
    fs.readFile(path.join(__dirname, 'data', 'products.json'), 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error al leer los productos' });
        }

        const products = JSON.parse(data);
        const newId = products.length ? Math.max(...products.map(p => p.id)) + 1 : 1;      // si no hay productos el id comienza en 1
        const newProduct = {
            id: newId,
            title,
            price: parseFloat(price),
            description,
            code: newCode,
            stock,
            category,
            thumbnails: newThumbnails,
        };    // nuevo producto con id

        products.push(newProduct);   // agrego el producto nuevo

        // guardo el archivo de productos
        fs.writeFile(path.join(__dirname, 'data', 'products.json'), JSON.stringify(products, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Error al guardar el producto' });   // en caso de error devuelve un 500
            }

            console.log('¡Producto agregado con exito');
            io.emit('newProduct', newProduct);   // emito el producto nuevo pero ahora a todos los clientes conectados
            res.status(201).json(newProduct);   // retorno un 201
        });
    });   
});

app.get('/realtimeproducts', (req, res) => {   // ruta para mostrar los productos en tiempo real
    fs.readFile(path.join(__dirname, 'data', 'products.json'), 'utf-8', (err, data) => {  // leo el archivo 'products.json' de la carpeta 'data'
        if (err) {
            return res.status(500).json({ error: 'Error reading products data' });  // retorno un 500
        }

        const products = JSON.parse(data);   // parseo el contenido de JSON

        res.render('realTimeProducts', { products });   // renderizo realtimeproducts a la vista y paso los productos
    });
});

// configuracion de websockets con socket.io
io.on('connection', (socket) => {
    console.log('A user connected');   // confirmo que un usuario se ha conectado

    // escucho el evento 'addProduct' y emitimos el nuevo producto a todos los clientes
    socket.on('addProduct', (product) => {
        const { title, price, description, stock, category } = product; // sin imagen
        const newProduct = { title, price, description, stock, category };
        console.log('Emitiendo producto:', newProduct);
        io.emit('newProduct', newProduct);  // solo notifico el nuevo producto sin la imagen      
    });

    // escucho el evento 'deleteProduct' y emitimos la eliminacion del producto a todos los clientes
    socket.on('deleteProduct', (productId) => {
        io.emit('deleteProduct', productId);  // aqui emitimos la eliminacion del producto a todos los clientes
    });

    // descnoectamos
    socket.on('disconnect', () => {
        console.log('A user disconnected');   // cuando un usuario se desconecta
    });
});

// configuración de las rutas para la API
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

// Middleware para manejar rutas no encontradas
app.use((req, res, next) => {
    console.log(`Ruta no encontrada: ${req.method} ${req.url}`);  // Muestra en la terminal
    res.status(404).json({
        success: false,
        message: "Not Found"
    });
});

// Middleware de manejo de errores
app.use(errorHandler);

//  inicio el servidor
server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);  // mensaje de escucha del puerto
});