import handlebars from "express-handlebars";
import express from 'express';
import __dirname from './utils.js';
import viewsRouter from './routes/views.router.js'
import { Server } from "socket.io";  // importo el constructor de un servidor de sockets

const app = express();
const httpServer = app.listen(8081, () => {
    console.log('Listening on port 8081');
});
// creo un servidor de sockets que vive dentro del servidor HTTP
const socketServer = new Server(httpServer);

// Arreglo para almacenar los mensajes
const messages = []; // defino un arreglo para todos los mensajes

// configuro el motor de plantillas handlebars (3 lineas)
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');  // utlizo un path absoluto de la ubicacion de las plantillas
app.set('view engine', 'handlebars');   // establesco que el motor de plantilla es handlebars
// cargo la carpeta "public" como carpeta de archivos estaticos
app.use(express.static(__dirname + '/public'));
// seteo los routers cargados
app.use('/', viewsRouter);

// para escuchar conexiones entrantes:
socketServer.on('connection', socket => {
    console.log('nuevo cliente conectado');

    /**
    * socket.on("nombre del evento a escuchar", callback con la data enviada)
    */
    socket.on('message', data => {
        console.log(data);
    });

    // emito un evento privado al socket que ejecutó este codigo, al socket actual
    // util para notificaciones personalizadas aun cliente en especifico
    socket.emit('evento_para_socket_individual', "Este mensaje solo lo recibe el socket conectado");

    //  emito un evento en general menos al socket actual
    socket.broadcast.emit('evento_para_todos_menos_para_el_socket_actual', "Este evento lo veran todos los sockets conectados menos el socket actual");

    socketServer.emit('evento_para_todos', "Este mensaje lo reciben todos los sockets conectados");

    /* Ejercicio para enviar mensajes */

    socket.emit('loadMessage', messages);  // envio todos los mensajes previos a un nuevo cliente conectado

    socket.broadcast.emit('newUser', socket.id)   // le aviso a todos que alguien se conecto

    // manejo de nuevos mensajes
    socket.on('newMessage', message => {
        const newMessage = { socketid: socket.id, message };  // para saber quien habla
        messages.push(newMessage);   // añado el nuevo mensaje al arreglo de mensajes
        console.log('nuevo mensaje recibido', newMessage);
        socketServer.emit('newMessage', newMessage);  // el nuevo mensaje a todos
    })

});