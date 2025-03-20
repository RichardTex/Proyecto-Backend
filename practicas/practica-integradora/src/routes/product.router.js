// operaciones CRUD pero devuelvo respuestas con vistas renderizadas
import { router } from 'express';
import ProductModel from '../models/product.model';

const router = Router();

// C Create
router.post('/', async (req, res) => {
    try {
        const newProduct = new ProductModel(req.body);
        console.log('info del body')

        await newProduct.save();
        res.json({newProduct});
    } catch (error) {
        return res.send({ mesagge})
    }
})

// R Read
router.get('/:cod', async (req, res) => {
    try {
        const product = await ProductModel.findOne({ cod: req.params.cod });
        if (!product) {
            return res.json({ error: "error" });
        }
        res.render('product', { product: product.toObject() });
    } catch (error) {
        return res.send({ message: "error" });
    }
});

// U Update


// D Delete


export default router;