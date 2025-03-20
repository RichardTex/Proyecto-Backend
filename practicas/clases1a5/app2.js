import express from 'express';

// hay que inicializar
const app = express(); // a partir de aqui app tendra todas las funcionalidades de express

//porque los dos puntos. porque definimos el parametro. se crea una ruta dinamica que recibe cualquier parametro
app.get('/dosParametros/:nombre/:apellido', (req, res) => {
    //el parametro ahora se encontrara dentro del objeto req.params
    console.log(req.params.usuario);
    res.send(`<h1 style="color: blue">El nombre completo es: ${req.params.nombre} ${req.params.apellido}</h1>`)
})

app.listen(8081, () => {
    console.log(`Listening peticions`)
});