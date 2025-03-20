import express from 'express';

const app = express();

app.use(express.json());  // indica que ahora puede recibir JSON
app.use(express.urlencoded({ extended: true }));  // permite enviar informacion desde la URL

app.listen(8080, () => {
    console.log("Escuchando en el puerto 8080")  // permite que se pueda enviar informacion tambien desde la URL
})

let users = [
    { id: "1", first_name: "Maxi", last_name: "Sastre" }
]; // se almacen los usuarios en el array


// METODO GET: Obtener todos los usuarios
app.get('/api/user', (req, res) => {
    res.json({ users });
})


// METODO GET: Para obtener informacion de un usuario por ID
app.get('/api/user/:id', (req, res) => {
    const userId = req.params.id;
    const user = users.find(u => u.id === userId);  // comprarando strings
    if (!user) {
        return res.status(404).send({ status: "error", error: "User not found" });
    }
    res.json({ users });
})


// METODO POST: agregar usuarios
app.post('/api/user', (req, res) => {
    let user = req.body;  // req.body es el JSON que enviara el usuario al momento de la peticion

    // Validar que se cumplan criterios de campos antes de agregarlos
    if (!user.first_name || !user.last_name) {

        // si no mando los datos, es un error del cliente, ergo estado 400
        return res.status(400).send({ status: "error", error: "incomplete values" });
    }

    // en caso de que no entro al if, el cliente agrego los datos de forma copmpleta. entonces: agregamos
    users.push(user);
    res.status(201).send({ status: "success", message: "User created" });
})


// METODO PUT ACTUALIZAR Usuarios
app.put('/api/user/:id', (req, res) => {
    const userId = req.params.id;
    const updateUser = req.body;
    // buscamos el indice o la posicion en el array del usuario que queremos actualizar usando el id
    const userIndex = users.findIndex(user => user.id === userId);
    if (userIndex === -1) {
        return res.status(404).send({ status: "error", error: "User not found" });
    }
    // users[userIndex] = updateUser;   opcion 1 actualizar completa. actualiza totalmente
    users[userIndex] = { ...users[userIndex], ...updateUser };
    res.send({ status: "success", message: "user update" });
})

// METODO DELETE: Elimina usuarios
app.delete('/api/user/:name', (req, res) => {
    let name = req.params.name;
    let currentLength = users.length;
    users = users.filter(user => user.first_name != name)
    if (users.length === currentLength) {  // si la longitud es igual, entonces no se borro nada
        return res.status(404).send({ status: "error", error: "User not found" });
    }
    res.status(201).send({ status: "success", message: "User deleted" });
})