import handlebars from "express-handlebars";
import express from 'express';
import __dirname from './utils.js';
import viewsRouter from './routes/views.router.js'
import { Server } from "socket.io";  // importo el constructor de un servidor de sockets

const app = express();
const httpServer = app.listen(8082, () => {
    console.log('Listening on port 8082');
});
// creo un servidor de sockets que vive dentro del servidor HTTP
const io = new Server(httpServer);

// configuro el motor de plantillas handlebars (3 lineas)
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');  // utlizo un path absoluto de la ubicacion de las plantillas
app.set('view engine', 'handlebars');   // establesco que el motor de plantilla es handlebars
// cargo la carpeta "public" como carpeta de archivos estaticos
app.use(express.static(__dirname + '/public'));
// seteo los routers cargados
app.use('/', viewsRouter);

/* 
Empezamos a trabajar con el servidor socket
escuchamos conexiones
 */

let messages = []; //Los mensajes se almacenarán aquí

io.on('connection', socket => {
    console.log(`Nuevo cliente conectado: ${socket.id}`);

    socket.on('userAuthenticated', user => {
        //Emitir los logs del chat al usuario que se acaba de autenticar
        socket.emit('messageLogs', messages);
        //Emitir una notificación a todos los demás usuarios
        socket.broadcast.emit('newUserConnected', user);
    })

    //Recibir mensajes y enviarlos a todos los clientes
    socket.on('message', (data) => {//Escuchamos el evento con el mismo nombre que emite el cliente: "message"
        messages.push(data); //Guardamos el mensaje en la "base"
        io.emit('messageLogs', messages); //Reenviamos instántaneamente los logs actualizados a TODOS los clientes
    })
})
