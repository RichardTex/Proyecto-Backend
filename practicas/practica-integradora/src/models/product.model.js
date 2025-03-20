import mongoose from "mongoose";

const { schema } = mongoose;

const productCollection = 'product';
// defino el esquema para el producto
const productSchema = new Schema({
    name: {type: String, required: true},
    price: {type: number, required: true},
    description: {type: String, required: true},
})

const ProductModel = mongoose.model(productCollection, productSchema)

export default ProductModel;