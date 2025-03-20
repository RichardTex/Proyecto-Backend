import express from 'express';

// hay que inicializar
const app = express(); // a partir de aqui app tendra todas las funcionalidades de express

app.use(express.urlencoded({extends:true}))

// Endpoint "/productos" para devolver 
app.get('/ejemploQueries', (req, res) => {

    let consulta = req.query;  
    // a diferencia de req.params, no tengo contempado que cosas me van a pedir.
    // si podemos delimitar haciendo un destructuring
    let { apellido, nombre, edad } = req.query;
    // no nos importa que llegue del query, solo extraemos, el apellido, nombre o edad
    // aumenta la seguridad del servidor porque evitamos recibir elementos extraños

    res.send({consulta})
})

// conexion con el puerto
app.listen(8080, () => {
    console.log(`Listening queries2 exercise`)
});