import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);  // es para obtener la ruta del archivoa actual
const __dirname = path.dirname(__filename);  // para obetener el directorio del archivo

const cartsFilePath = path.join(__dirname, '../data/carts.json');  // ruta del archivo json donde se almacenan los carritos

class CartManager {
    constructor() { this.path = cartsFilePath; }  // la ruta del archivo json se establece en una propiedad

    // leo los carritos desde el archivo json
    readCarts() {
        if (!fs.existsSync(this.path)) return []; // si el archivo no existe, devuelvo un array vacio
        const data = fs.readFileSync(this.path, 'utf-8'); // leo el contenido del archivo json
        return JSON.parse(data); // convierto el contenido del archivo en un objeto json y lo retorno
    }

    // escribo los carritos en el archivo json
    writeCarts(carts) {
        fs.writeFileSync(this.path, JSON.stringify(carts, null, 2), 'utf-8'); // escribo el archivo con los carritos actualizados
    }

    // obtengo todos los carritos
    getCarts() {
        return this.readCarts();  // retorno la lista de carritos leidos del archivo
    }

    // obtengo un carrito por id
    getCartById(id) {
        const carts = this.readCarts(); // leo los carritos
        return carts.find(c => c.id === Number(id)) || null; // busco el carrito por id y lo retorno o null si no existe
    }

    // creo un nuevo carrito
    createCart() {
        const carts = this.readCarts(); // leo los carritos
        const newCart = {
            id: carts.length > 0 ? Math.max(...carts.map(c => c.id)) + 1 : 1, // genero un id unico para el nuevo carrito
            products: [] // inicializo el carrito con un array vacio de productos
        }

        carts.push(newCart); // agrego el nuevo carrito a la lista de carritos
        this.writeCarts(carts); // escribo los carritos actualizados en el archivo json
        return newCart; // retorno el carrito creado
    }

    // agrego un producto a un carrito
    addProductToCart(cartId, productId, quantity = 1) {
        const carts = this.readCarts(); // leo los carritos
        const cart = carts.find(c => c.id === Number(cartId)); // busco el carrito por id

        if (!cart) return null; // si el carrito no existe, retorno null

        const productIndex = cart.products.findIndex(p => p.productId === Number(productId)); // busco el producto en el carrito
        if (productIndex === -1) {
            cart.products.push({ productId: Number(productId), quantity }); // si no existe, lo agrego con la cantidad especificada
        } else {
            cart.products[productIndex].quantity += quantity; // si ya existe, incremento la cantidad
        }

        this.writeCarts(carts); // escribo los carritos actualizados en el archivo json
        return cart; // retorno el carrito actualizado
    }

    // elimino un carrito
    deleteCart(id) {
        const carts = this.readCarts(); // leo los carritos
        const cartIndex = carts.findIndex(c => c.id === Number(id)); // busco el carrito por id

        if (cartIndex === -1) return false; // si el carrito no existe, retorno false

        carts.splice(cartIndex, 1); // elimino el carrito del array de carritos
        this.writeCarts(carts); // escribo los carritos actualizados en el archivo json
        return true; // retorno true para indicar que el carrito fue eliminado
    }

    // eliminar un producto de un carrito
    removeProductFromCart(cartId, productId) {
        const carts = this.readCarts(); // leo los carritos del archivo json
        const cartIndex = carts.findIndex(c => c.id === Number(cartId)); // busco el carrito por id

        if (cartIndex === -1) return null   // si no exite retorno null

        const productIndex = carts[cartIndex].products.findIndex(p => p.productId === Number(productId)); // busco el producto en el carrito

        if (productIndex === -1) return null    // si no exite retorno null

        carts[cartIndex].products.splice(productIndex, 1); // elimino el producto del carrito
        this.writeCarts(carts); // guardo los cambios en el archivo json

        return carts[cartIndex]; // retorno el carrito actualizado
    }
}

export default CartManager; // exporto la clase CartManager para ser utilizada en otros archivos