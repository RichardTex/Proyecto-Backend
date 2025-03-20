import express from 'express';

// hay que inicializar
const app = express(); // a partir de aqui app tendra todas las funcionalidades de express

const productos = [
    {id: "1", nombre: "martillo"},
    {id: "2", nombre: "pala" },
    {id: "3", nombre: "sierra" }
]

app.use(express.urlencoded({extends:true}))

// Endpoint "/productos" para devolver 
app.get('/productos', (req, res) => {    
    let idProducto = req.query.idProducto;  
    // a diferencia de req.params, no tengo contempado que cosas me van a pedir.
    // si podemos delimitar haciendo un destructuring
    let producto = productos.find(prod => prod.id === idProducto);
    if(!producto) return res.send({error: "producto no encontrado"});
    res.send({producto})
})

// conexion con el puerto
app.listen(8083, () => {
    console.log(`Listening queries exercise`)
});