const Carts = require('./models/carts.model')
const ProductManager = require ('../DAO/productManagerDb')
const productManager = new ProductManager()
const mongoose = require('mongoose')


class CartManager {

    async addCart() {
        try {
            const newCart = {
              products : []
            }
  
            //pusheo el nuevo carrito
            await Carts.create(newCart)
            return { success: true, message: 'Carrito creado correctamente' }
   
        } catch (error) {
            console.error('Error al crear el carrito:', error.message)
            return { success: false, message: 'Error interno al procesar la solicitud.' }
        }
      }

    async getCartByID (id) {
        try {
          const findCart = await Carts.findOne({ _id: id})
          if (findCart) return findCart
        } catch (error) {
            console.log ('Error al obtener los productos del carrito:', error.message)
          } 
      }

    
async addProductInCart(cid, pid) {
    try {
        // Verificar si el carrito existe
        const cart = await Carts.findById(cid);

        if (cart) {
            // Verificar si el producto existe en la lista de productos generales
            const product = await productManager.getProductByID(pid)

            if (product) {
               // Verificar si el producto ya está en el carrito
                const productIndex = cart.products.findIndex(prod => prod.product.toString() === pid.toString());

                if (productIndex !== -1) {
                    // Si el producto ya está en el carrito, incrementar la cantidad
                    cart.products[productIndex].quantity++;
                } else {
                    // Si el producto no está en el carrito, agregarlo
                    cart.products.push({ product: new mongoose.Types.ObjectId(pid), quantity: 1 });
                }

                // Guardar el carrito actualizado en la base de datos
                await cart.save();
                console.log('Producto agregado al carrito con éxito');
                return { success: true, message: 'Producto agregado correctamente al carrito' }
            } else {
                console.log('El producto no existe en la base de datos');
                return { success: false, message: 'El producto no existe en la lista general de productos.' }
            }
        } else {
            console.log('El carrito no existe en la base de datos');
            return { success: false, message: 'carrito no encontrado.' }
        }
    } catch (error) {
        console.error('Error al agregar el producto al carrito:', error);
        return { success: false, message: 'internal server error' }
    }
  }

}

module.exports = CartManager


