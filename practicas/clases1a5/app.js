import express from 'express';

// hay que inicializar
const app = express(); // a partir de aqui app tendra todas las funcionalidades de express

const PORT = 8080;

// ENDPOINT para la bienvenida!
app.get("/bienvenida", (req, res) => {
    res.send('<h1 style="color: blue">Bienvenido a mi App!</h1>')
})

// ENDPOINT para obtener datos de un usuario
app.get("/usuario", (req, res) => {
    const usuario = {
        nombre: "Maxi",
        apellido: "Sastre",
        edad: 48,
        correo: "ex@gmail.com"
    }
    res.json(usuario);
})

// por defecto localhost o 127.0.0.1
// LUEGO el segundo argumento es un callback con console.log que muestra que el puerto esta activo
app.listen(PORT, () => {
    console.log(`lListening on port ${PORT}`)
});

// app.get: realiza una apaertura de un ENDPOINT
// indica al protocolo HTTP que en la ruta "/saludo" espera una peticion GET
// Si se llama a otra ruta u otro metodo no lo va a reconocer
//app.get(`/saludo`, (req, res) =>{
//    //res.send sirve para responder a la peticion con contenido adentro
//    res.send("hola a todos, desde express")
//})