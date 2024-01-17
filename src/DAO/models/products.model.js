const mongoose = require ('mongoose')

const productsCollection = 'product'

const productsSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    thumbnail: String,
    code: {
        type: String,
        unique: true,
    },
    stock: Number,
    status: Boolean,
    category: String,
})

const Products = mongoose.model(productsCollection, productsSchema)

module.exports = Products