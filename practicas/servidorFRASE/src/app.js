import express from 'express';

const app = express();

app.use(express.json());  // indica que ahora puede recibir JSON
app.use(express.urlencoded({ extended: true }));  // permite enviar informacion desde la URL

app.listen(8080, () => {
    console.log("Escuchando en el puerto 8080")  // permite que se pueda enviar informacion tambien desde la URL
})

let frase = "Frase inicial con muchas palabras";

// metodo GET '/api/frase' : devuelve un objeto que como campo ‘frase’ contenga la frase completa
app.get('/api/frase', (req, res) => {
    res.json({frase});
})


// metodo GET '/api/palabras/:pos' : devuelve un objeto que como campo ‘buscada’ contenga la palabra hallada
//   en la frase en la posición dada(considerar que la primera palabra es la #1).
app.get('/api/palabra/:pos', (req, res) => {   // la posicion viene en formato String
    const pos = parseInt(req.params.pos);       // parseamos "pos": de String a numero
    const palabrasEnArray = frase.split(' ');  // modifica el array con las palabras separadas de la frase
    const palabraBuscada = palabrasEnArray[pos-1];
    if(!palabraBuscada){
        return res.status(404).json({ status: "error", error: "Word not found" });
    }
    res.json({buscada: palabraBuscada});
})

// metodo POST '/api/palabras': recibe un objeto con una palabra bajo el campo ‘palabra’ y la agrega al final de la frase.
// Devuelve un objeto que como campo ‘agregada’ contenga la palabra agregada, y en el campo ‘pos’
//  la posición en que se agregó dicha palabra.
app.post('/api/palabra', (req, res) => {
    const {palabra} = req.body;  // {palabra} es una palabra
    frase += ` ${palabra}`;
    const pos = frase.split(' ').length;
    res.json({agregada: palabra, pos});
})


// metodo PUT '/api/palabras/:pos': recibe un objeto con una palabra bajo el campo ‘palabra’ y
// reemplaza en la frase aquella hallada en la posición dada.Devuelve un objeto que como campo
// ‘actualizada’ contenga la nueva palabra, y en el campo ‘anterior’ la anterior.
app.put('/api/palabra/:pos', (req, res) => {
// 1) buscar y verificar que exista esa palabra en la posicion
    const pos = parseInt(req.params.pos) - 1;   // ajustamos para convertir la posición en índice de array
    const palabrasEnArray = frase.split(' ');  // convertimos la frase en un array de palabras

    if (pos < 0 || pos >= palabrasEnArray.length) {  // Verificamos si la posición es válida
        return res.status(404).json({ status: "error", error: "Word not found" });
    }

    const { palabra } = req.body;  // Obtenemos la nueva palabra
    const palabraAnterior = palabrasEnArray[pos]  // Guardamos la palabra anterior en esa posición
// 2) Reemplazar: para poder reemplazar la palabra tenemos que reemplazar el elemento en el array
    palabrasEnArray[pos] = palabra;
// 3) Almacenar la frase. habra que volver a unir el array con espacios
    frase = palabrasEnArray.join(' ');  // metodo join me une los elementos
    res.json({actualizada: palabra, anterior: palabraAnterior});  // devolvemos la respuesta
})

// metodo DELETE '/api/palabras/:pos': elimina una palabra en la frase, según la posición dada
// (considerar que la primera palabra tiene posición #1).
app.delete('/api/palabra/:pos', (req, res) => {
    const pos = parseInt(req.params.pos) - 1;   // ajustamos para convertir la posición en índice de array
    const palabrasEnArray = frase.split(' ');  // convertimos la frase en un array de palabras
    palabrasEnArray.splice(pos, 1);   // posicion. cantidad de elementos a eliminar
    frase = palabrasEnArray.join(' ');  // metodo join me une los elementos
    res.json({ mensaje: "palabra eliminada" });  // devolvemos la respuesta
})