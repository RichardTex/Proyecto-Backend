import mongoose from "mongoose";

const alumnoSchema = new mongoose.Schema({
    // seteo las propiedades que queremos que un usuario tenga en la aplicación
    nombre: {
        type: String,
        required: true,
    },
    edad: String,
    genero: String,
    curso: String,
});

const userModel = mongoose.model("alumnos", alumnoSchema);
export { userModel };