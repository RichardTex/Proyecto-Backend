import { userModel } from '../models/user.model.js'; // Aquí sigue importando el modelo, ya que lo usaremos para los alumnos

const router = Router();

// READ (Obtener todos los alumnos)
router.get('/', async (req, res) => {
    try {
        let alumnos = await userModel.find(); // Buscamos todos los alumnos en la base de datos
        res.send({ result: "success", payload: alumnos }); // Devolvemos la lista de alumnos
    } catch (error) {
        console.log("Cannot get students with mongoose: " + error);
    }
});

// CREATE (Crear un nuevo alumno)
router.post('/', async (req, res) => {
    let { nombre, edad, genero, curso } = req.body; // Los campos de los alumnos
    if (!nombre || !edad || !genero || !curso) {
        return res.send({ status: "error", error: "Incomplete values" }); // Verificamos si hay campos vacíos
    }
    let result = await userModel.create({ // Creamos un nuevo alumno
        nombre,
        edad,
        genero,
        curso
    });
    res.send({ status: "success", payload: result }); // Enviamos el alumno recién creado
});

// UPDATE (Actualizar un alumno)
router.put('/:uid', async (req, res) => {
    let uid = req.params.uid; // Obtenemos el id del alumno a actualizar
    let alumnoToUpdate = req.body; // Obtenemos los nuevos datos
    if (!alumnoToUpdate.nombre || !alumnoToUpdate.edad || !alumnoToUpdate.genero || !alumnoToUpdate.curso) {
        return res.send({ status: "error", error: "Incomplete values" }); // Verificamos si los valores son completos
    }
    let result = await userModel.updateOne(
        { _id: uid }, // Filtramos por _id del alumno
        alumnoToUpdate // Y actualizamos sus datos
    );
    res.send({ status: "success", payload: result }); // Enviamos el resultado
});

// DELETE (Eliminar un alumno)
router.delete('/:uid', async (req, res) => {
    let uid = req.params.uid; // Obtenemos el id del alumno a eliminar
    let result = await userModel.deleteOne({ _id: uid }); // Eliminamos el alumno por su id
    res.send({ status: "success", payload: result }); // Enviamos el resultado de la eliminación
});

export default router;