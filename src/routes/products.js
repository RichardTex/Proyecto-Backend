import express from 'express';
import ProductManager from '../managers/ProductManager.js';
import upload from '../middlewares/multer.js';

// creo una instancia del router
const router = express.Router();

// creo una instancia de ProductManager
const productManager = new ProductManager();

// Middleware a nivel de router
router.use((req, res, next) => {
    console.log(`Log de productos: ${req.method} ${req.path} - ${new Date().toISOString()}`);
    next();   // paso al siguiente middleware
});

// Middleware de validación para productos (POST y PUT)
function validateProduct(req, res, next) {
    const { title, price, description, code, stock, category } = req.body;
    if (!title || !price || !description || !code || !stock || !category) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    next();
}

// Middleware de timestamp (añade fecha y hora a la solicitud)
function addTimestamp(req, res, next) {
    req.timestamp = new Date().toISOString();
    next();
}

//  endpoint para subir una imagen MULTER
router.post('/upload/:pid', upload.single('image'), (req, res) => {
    const { pid } = req.params; // Obtengo el ID del producto

    // Si no se sube ningún archivo, retorno un error
    if (!req.file) {
        return res.status(400).json({ error: 'No image uploaded' });
    }

    // busco el producto por ID
    const product = productManager.getProductById(pid);
    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }

    // agrego la imagen al array thumbails
    const imagePath = `/img/${req.file.filename}`; // Ruta donde se guardó la imagen
    if (!product.thumbnails) {
        product.thumbnails = []; // Si no existe, inicializo el array
    }
    product.thumbnails.push(imagePath); // Agrego la nueva imagen

    // guardo el producto actualizado
    productManager.updateProduct(pid, product);

    // Si la imagen se sube correctamente, retorno un mensaje con el nombre del archivo
    res.json({ message: 'Image uploaded and added to product', product });
});

// enpoint para subir multiples imagenes MULTER
router.post('/uploadMultiple', upload.array('images', 5), (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: 'No images uploaded' });
    }
    res.json({
        message: 'Images uploaded successfully',
        filenames: req.files.map(file => file.filename),
    });
});

// obtengo todos los productos
router.get('/', (req, res) => {
    const limit = parseInt(req.query.limit);  // se agrega un limite de consultas mediante un parseo a entero
    const products = productManager.getProducts(limit);  // obtengo los productos con o sin limite   
    res.json(products);  // Respondo con la lista de todos los productos en formato JSON
});

// obtengo un producto por ID
router.get('/:pid', (req, res) => {
    const product = productManager.getProductById(req.params.pid);  // Busco el producto con el ID que llega en los parámetros

    if (!product) {  //  Si no lo encuentro al producto
        res.status(404).send('Product not found');  //  el resultado sera un error
    }
    res.json(product);  // si lo encuentro devuelvo un JSON del producto
});

// agregar un producto nuevo
router.post('/', (req, res) => {
    const newProduct = productManager.addProduct(req.body);  // agrego un producto nuevo
    res.status(201).json(newProduct); //  da como resultado un 201
});

// Actualizar un producto ya existente
router.put('/:pid', (req, res) => {
    const updatedProduct = productManager.updateProduct(req.params.pid, req.body); // actualizo el producto

    if (!updatedProduct) {
        return res.status(404).send('Product not found');  // da como resultado un 404
    }
    res.json(updatedProduct); // envio el producto actualizado    
});

// Eliminar un producto
router.delete('/:pid', (req, res) => {
    const deleted = productManager.deleteProduct(req.params.pid); //  elimino el prodcuto

    if (!deleted) {
        return res.status(404).send('Product not found');   // si nmo existe da como resultado un 404
    }
    res.status(204).send('No content');  // da como resultado un 204 no content
});

export default router;   // exporto el router para que se pueda usar en el archivo principal