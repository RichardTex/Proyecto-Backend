import express from 'express';

const app = express();
const router = express.Router();
const PORT = 8080;

// Middleware aplicado solo al router de /admin
router.use((req, res, next) => {
    console.log(`Acceso a ADMIN: ${req.method} ${req.url}`);
    next();
});

// Defino rutas dentro de /admin que están protegidas por el middleware
router.get('/dashboard', (req, res) => {
    res.send('Bienvenido al panel de administración');
});
router.get('/settings', (req, res) => {
    res.send('Configuraciones del administrador');
});

// Agrego el router a la aplicación
app.use('/admin', router);

app.listen(8080, () => console.log('Servidor corriendo en el puerto 8080'));