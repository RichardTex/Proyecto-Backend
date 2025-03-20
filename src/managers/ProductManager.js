import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url); // obtengo la ruta del archivo actual
const __dirname = path.dirname(__filename); // obtengo el directorio donde se encuentra el archivo actual

// ruta del archivo json donde se almacenan los productos
const productsFilePath = path.join(__dirname, '../data/products.json');

class ProductManager {
    constructor() { this.path = productsFilePath; }   // establezco la ruta del archivo json en una propiedad

    // leo los productos desde el archivo json
    readProducts() {
        if (!fs.existsSync(this.path)) return []; // si el archivo no existe devuelvo un array
        const data = fs.readFileSync(this.path, 'utf-8'); // leo el contenido del archivo json
        return JSON.parse(data); // convierto el contenido del archivo en un objeto json y lo retorno
    }

    // escribo los productos en el archivo json
    writeProducts(products) {
        fs.writeFileSync(this.path, JSON.stringify(products, null, 2), 'utf-8'); // escribo el archivo con los productos actualizados
    }

    // obtengo todos los productos
    getProducts(limit = null) {
        const products = this.readProducts(); // leo los productos del archivo json
        return limit ? products.slice(0, limit) : products; // aplico un limite
    }

    // obtengo un producto por id
    getProductById(id) {
        const products = this.readProducts(); // leo los productos
        return products.find(p => p.id === Number(id)) || null; // busco el producto por id y lo retorno o null si no existe
    }

    // agrego un nuevo producto
    addProduct({ title, price, description, code, stock, category, thumbnails, status = true }) {
        const products = this.readProducts(); // leo los productos
        const newProduct = {
            id: products.length > 0 ? products[products.length - 1].id + 1 : 1, // genero un id unico para el nuevo producto
            title,
            price,
            description,
            code,
            stock,
            category,
            thumbnails: thumbnails || [],   // si no hay una imagen se usa un array vacio
            status
        };
        products.push(newProduct); // agrego el nuevo producto a la lista de productos
        this.writeProducts(products); // escribo los productos actualizados en el archivo json
        return newProduct; // retorno el producto creado
    }
    // actualizo un producto existente
    updateProduct(id, updatedFields) {
        const products = this.readProducts(); // leo los productos
        const productIndex = products.findIndex(p => p.id === Number(id)); // busco el indice del producto por id

        if (productIndex === -1) return null; // si el producto no existe retorno null

        products[productIndex] = {
            ...products[productIndex], // mantengo los datos originales
            ...updatedFields // actualizo solo los campos enviados
        };

        this.writeProducts(products); // escribo los productos actualizados en el archivo json
        return products[productIndex]; // retorno el producto actualizado
    }

    // elimino un producto por id
    deleteProduct(id) {
        const products = this.readProducts(); // leo los productos
        const productIndex = products.findIndex(p => p.id === Number(id)); // busco el indice del producto por id

        if (productIndex === -1) return false; // si el producto no existe retorno falso

        products.splice(productIndex, 1); // elimino el producto del array de productos
        this.writeProducts(products); // escribo los productos actualizados en el archivo json
        return true; // retorno true para indicar que el producto fue eliminado
    }
}

export default ProductManager; // exporto la clase ProductManager para ser utilizada en otros archivos