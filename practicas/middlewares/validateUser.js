import express from 'express';

const app = express();
const PORT = 8080;

app.use(express.json());   // se permite JSON en el body de las solicitudes

// Middleware de validación para verificar que el usuario tenga nombre y edad válida
const validateUser = (req, res, next) => {
    const { name, age } = req.body;

    if (!name || !age) {
        return res.status(400).json({ error: 'name y age son requeridos' });
    }
    if (typeof age !== 'number' || age < 18) {
        return res.status(400).json({ error: 'age debe ser un número y mayor de 18' });
    }

    next();
};

app.post('/users', validateUser, (req, res) => {
    res.status(201).json({ message: 'Usuario creado correctamente', data: req.body });
});

// Servidor escuchando en puerto 8080
app.listen(8080, () => console.log('Servidor corriendo en el puerto 8080'));


