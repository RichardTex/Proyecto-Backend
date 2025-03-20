// lado cliente 
const socket = io();

// socket hace referencia a "socket.io", se llama asi por conveccion
// nos permite instanciar el sochet y guardarlo en la constante "socket"
// Este socket es el que usare para comunicarnos con el socket del servidor

//Creación de elementos del DOM y variables auxiliares
let user; //Este "user" será con el que el cliente se identificará para saber quién escribió el mensaje
let chatBox = document.getElementById('chatBox'); //Obtenemos la referencia del cuadro donde se escribirán los mensajes

// alerta de identificacion
Swal.fire({
    title: 'Identificate',
    input: 'text',  // el cliente debera escribir un texto para poder avanzar
    text: 'Ingresa tu usuario para identificarte en el chat',
    allowOutsideClick: false,  //  no permite salir del cartel de swal al dar el click afuera
    inputValidator: (value) => {
        return !value && 'Necesitas escribir un nombre de usuario para continuar.'  // esta validacion ocurre si el usuario
        //  decide dar en continuar sin haber colocado un nombre de usuario
    }
}).then(result => {
    //Una vez que el usuario se identifica, le asignamos la variable User al objeto HTML con id 'username-display'
    user = result.value;
    document.getElementById('username-display').textContent = user;
    //Cuando me autentico, emito un evento
    socket.emit('userAuthenticated', { user: user });
})

//Eventlistener para el input del chat a través del enter
chatBox.addEventListener('keyup', (evt) => {
    if (evt.key === 'Enter') {//El mensaje se enviará cuando el usuario aprete "Enter" en la caja de chat
        if (chatBox.value.trim().length) { //Corroboramos que el mensaje no esté vacío o sólo contenga espacios.
            socket.emit('message', { user: user, message: chatBox.value }); //Emitimos nuestro primer evento
            chatBox.value = '';
        }
    }
})

//Escuchar el evento 'messageLogs' así actualimos la lista de mensajes
socket.on('messageLogs', data => {
    let log = document.getElementById('messagesLogs');
    let messagesHtml = "";
    data.forEach(message => {
        messagesHtml += `${message.user} dice: ${message.message}<br>`;
    })
    log.innerHTML = messagesHtml;
})

socket.on('newUserConnected', newUser => {
    //Mostrar una notificación usando SweetAlert2
    Swal.fire({
        text: "Nuevo usuario conectado",
        toast: true,
        position: 'top-right',
        showConfirmButton: false,
        icon: 'info',
        title: `${newUser.user} se ha unido al chat`,
        timer: 4000
    })



})