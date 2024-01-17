const { Router } = require('express')
const router = Router()
const ProductManager = require('../DAO/productManager')
const productManager = new ProductManager('./archivo/products.json')

router.get('/', async (req, res) => {
    try {
     //leo el parametro de consulta limit para la query
     const { limit } = req.query
     // traigo todos los productos
     const products = await productManager.getProducts()
     //realizo una validacion para saber si existe limit , si no, traigo todos los productos.
     if (!(isNaN(limit) || limit <= 0)) {    
         productsFilter = products.slice (0, limit)
         return res.json ({ productsFilter })
     }
     res.render ('realTimeProducts', { 
        products,
        style: 'style.css',
     })
    } catch (error) {
        console.error ('Error al obtener los products:', error.message)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})


module.exports = router