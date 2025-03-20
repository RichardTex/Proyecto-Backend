/*
LADO DEL CLIENTE: Hablando con un servidor
io hace referencia a socket.io
Instancio socket y se guarda en la constante "socket"
dicho socket lo utilizamos para comunicarnos con el socket del servidor
en este archivo somos como CLIENTE porque representamos una vista
*/
const socket = io();

socket.emit('message', 'Hola me estoy comunicando desde un websocket');  // emito eventos

socket.on('evento_para_socket_individual', data => console.log(data));

socket.on('evento_para_todos_menos_para_el_socket_actual', data => console.log(data));

socket.on('evento_para_todos', data => console.log(data));

/* Simulo un chat */
const messageButton = document.getElementById('sendMessage');
const messageInput = document.getElementById('messageInput');
const messageContainer = document.getElementById('messageContainer');

messageButton.addEventListener('click', () => {
    const message = messageInput.value;
    messageInput.value = '';
    socket.emit('newMessage', message);
});

socket.on('loadMessage', messages => {
    messages.forEach(unMensaje => {
        cargarMensaje(unMensaje)
    });                // cargar todos los mensajes cuando me conecto, los cargo en mi interfaz web
});

socket.on('newMessage', message => {
    cargarMensaje(message);
});

socket.on('newUser', userId => {
    const messageElement = document.createElement('p');
    messageElement.textContent = `Se conecto el usuario con id: ${userId}`;
    messageContainer.appendChild(messageElement);
});

function cargarMensaje(unMensaje) {
    const messageElement = document.createElement('p');
    messageElement.textContent = `${unMensaje.socketid} : ${unMensaje.message}`;
    messageContainer.appendChild(messageElement);
}