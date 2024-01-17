const productsController = require ('../controllers/products.controller')
const cartsController = require ('../controllers/carts.controller')
const realtimeproducts = require('../controllers/realtimeproducts.controller')
const addproduct = require('../controllers/addproduct.controller')
const chat = require('../controllers/chat.controller')


const router = app => {
    app.use('/api/products', productsController)
    app.use('/api/carts', cartsController)
    app.use('/realtimeproducts', realtimeproducts)
    app.use('/addproduct', addproduct)
    app.use('/chat', chat)
}

module.exports = router