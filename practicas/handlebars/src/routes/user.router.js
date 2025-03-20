import { Router } from 'express';

const router = Router();

// array de usuarios vacio
let users = [];

// TRAER usuarios
router.get('/', (req, res) => {
    res.json(users);
})

// CREAR un usuario
router.post('/', (req, res) => {
    const {name, email, password} = req.body;

    //guardo en el array
    users.push({name, email, password});
    res.status(201).send('Success registered user');
})

export default router;