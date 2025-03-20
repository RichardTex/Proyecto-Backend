import express from 'express';
import mongoose from 'mongoose';
import { usuario, contraseña } from './credenciales.js'; // Importar las credenciales
import userRouter from './routes/user.router.js';

const app = express();

// Middleware para procesar JSON en las solicitudes
app.use(express.json());

const connectToDatabase = async () => {
    try {
        // Usa las credenciales importadas en la cadena de conexión
        const uri = `mongodb+srv://${usuario}:${contraseña}@clustercoder.69ocy.mongodb.net/estudiantes?retryWrites=true&w=majority`;
        await mongoose.connect(uri);
        console.log("Conexión exitosa a MongoDB Atlas!");

        // Iniciar el servidor solo si la base de datos se conecta correctamente
        const server = app.listen(8080, () => {
            console.log("Listening on PORT: 8080");
        });
    } catch (error) {
        console.error("Error de conexión:", error);
        process.exit(1);  // Detiene la ejecución si no se puede conectar a la base de datos
    }
};

connectToDatabase();

// Usar el router para las rutas de usuario
app.use('/api/user', userRouter); 