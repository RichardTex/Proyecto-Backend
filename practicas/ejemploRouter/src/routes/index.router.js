import { Router } from 'express';

const app = Router();

// un
router.get('/', (req, res) => {
    res.send('Hola desde la app');
});

// otro endpoint
router.get('/about', (req, res) => {
    res.send('Acerca de');
});

export default router;