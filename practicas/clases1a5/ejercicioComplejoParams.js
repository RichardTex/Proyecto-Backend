import express from 'express';

// hay que inicializar
const app = express(); // a partir de aqui app tendra todas las funcionalidades de express

const usuarios = [
    {id: "1", nombre: "Max", apellido: "Sastre", edad: 48},
    {id: "2", nombre: "Fran", apellido: "Sastre", edad: 15},
    {id: "3", nombre: "Juan", apellido: "Sastre", edad: 9},
    {id: "4", nombre: "Rosa", apellido: "bocalon", edad: 71}
]

// Endpoint raiz "/" para devolver todos los usuarios
app.get('/', (req, res) => {    
    res.json({usuarios});  // recomendado: mandar los datos en formato OBJETO en lugar de 
    // enviarlo como un array solo. Con las llaves, podemos ingresar mas informacion en el
    // futuro y no tenemos que cambiar el tipo de respuesta del lado del ciente
})

app.get('/:idUsuario', (req, res) => {
    let idUsuario = req.params.idUsuario; // obtenemos el id del usuario a trabajar
    // buscamos el id pasado por "params"
    let usuario = usuarios.find(user => user.id === idUsuario)
    // si no se encuentra al usuario, debemos finalizar devolviendo un "error"
    if (!usuario) return res.send({error: "Usuario no encontrado"})
    // en caso de que no haya finalizado la funcion, significa que el usuario si se encontro
    res.send({usuario});
})

app.listen(8083, () => {
    console.log(`Listening practics exercise`)
});