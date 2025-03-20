import { Router } from 'express';

const router = Router();

// Usuario de prueba para sustituir los campos en la plantilla
const user = {
    name: 'Juan',
    lastName: 'Perez',
    age: 30,
    email: 'juan.perez@example.com',
    phone: '11-4555-1234',
    role: 'admin'
}

// 
let food = [
    { name: 'Burger', price: '8.99' },
    { name: 'Banana', price: '0.99' },
    { name: 'Soda', price: '1.50' },
    { name: 'Salad', price: '5.00' },
    { name: 'Pizza', price: '12.50' }
]

router.get('/', (req, res) => {  // usamos un objeto de preuba para sustituir los campos en la plantilla
    let testUser = user;
    // se compone de (nombre de la plantilla, objeto para reemplazar campos)
    res.render('index', { user: testUser });  // res.renderen el metodo para renderizar las plantillas
});

router.get('/goodbye', (req, res) => {  // usamos un objeto de preuba para sustituir los campos en la plantilla
    let testUser = user;
    // se compone de (nombre de la plantilla, objeto para reemplazar campos)
    res.render('goodbye', { user: testUser });  // res.renderen el metodo para renderizar las plantillas
});

router.get('/indexFood', (req, res) => {
    // uso otro objeto de prueba al cual le meteremos la plantilla para sustituir los campos
    let testUser = user;

    res.render('indexFood', {         //el router de vistas siempre debe responder con un res.render
        user: testUser,
        food,
        style: 'index.css',
        isAdmin: testUser.role === 'admin'
    })
})

let users = [
    { name: 'Juan', lastName: 'Perez', age: 30, email: 'juan.perez@example.com', phone: '11-4555-1234' },
    { name: 'Lucia', lastName: 'Gomez', age: 25, email: 'lucia.gomez@example.com', phone: '221-4555-5678' },
    { name: 'Carlos', lastName: 'Martinez', age: 40, email: 'carlos.martinez@example.com', phone: '023-3555-8765' },
    { name: 'Ana', lastName: 'Lopez', age: 35, email: 'ana.lopez@example.com', phone: '11-3555-4321' },
    { name: 'Pedro', lastName: 'Rodriguez', age: 50, email: 'pedro.rodriguez@example.com', phone: '11-5555-9876' }
]

// punto de acceso para renderizar informacion de un usuario de manera aleatoria
router.get('/personalData', (req, res) => {         // se utiliza ruta raiz y no /API por ser un router de vistas
    // selecciono un usuario de forma aleatoria
    const randomIndex = Math.floor(Math.random() * users.length)
    const randomUser = users[randomIndex];

    res.render('personalData', { user: randomUser })             //el router de vistas siempre debe responder con un res.render
})

//Renderizar formulario de Registracion
router.get('/register', (req, res) => {
    res.render('register')
})

export default router;