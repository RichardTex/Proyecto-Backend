import express from 'express';

// hay que inicializar
const app = express(); // a partir de aqui app tendra todas las funcionalidades de express

//Filtraremos por genero masculino (M) y femenino (F)
const usuarios = [
    { id: "1", nombre: "Maxi", apellido: "Sastre", genero: "M" },
    { id: "2", nombre: "Juan", apellido: "Sastre", genero: "M" },
    { id: "3", nombre: "Gabriela", apellido: "Rojas", genero: "F" },
    { id: "4", nombre: "Rosa", apellido: "Bocalon", genero: "F" },
    { id: "5", nombre: "Fran", apellido: "Sastre", genero: "M" }
]

// Endpoint que va a filtrar generos 
app.get('/', (req, res) => {

    // agarro el params query genero
    let genero = req.query.genero;

    // si no se ingreso el genero, o si genero no es "M" o es "F"
    if (!genero || (genero !== "F" && genero !== "M")) return res.send({ usuarios });

    // en caso contrario continuamos con el filtro
    let usuariosFiltrados = usuarios.filter(user => user.genero === genero);
    res.send({ usuarios: usuariosFiltrados });
})

// conexion con el puerto
app.listen(8080, () => {
    console.log(`Preparado para hacer filtros`)
});