const fs = require('fs').promises


class CartManager {

    constructor(filePath, productManager) {
        this.carts = []
        this.cartId = 0
        this.path = filePath
        this.productManager = productManager
        // Cargar cart existentes desde el archivo al crear una nueva instancia
        this.loadCarts()
    }

    
    async loadCarts() {
        try {
            const contenidoJson = await fs.readFile(this.path, 'utf8')
            if (contenidoJson.trim()) {
                this.carts = JSON.parse(contenidoJson)
                // Encuentra el último ID para continuar con la secuencia
                this.cartId = Math.max(...this.carts.map(cart=> cart.id), 0) + 1
            }
        } catch (error) {
            console.error('No se puede leer el archivo, error:', error.message)
        }
    }

    async addCart() {
        try {
            const newCart = {
              id: this.cartId,
              products : []
            }
  
            //pusheo el nuevo carrito
            this.carts.push(newCart)
            await this.updateFile()
            return { success: true, message: 'Carrito creado correctamente' }
   
        } catch (error) {
            console.error('Error al crear el carrito:', error.message)
            return { success: false, message: 'Error interno al procesar la solicitud.' }
        }
      }

    async updateFile() {
        try {
            await fs.writeFile(this.path, JSON.stringify(this.carts, null, '\t'), 'utf8')
            console.log("Archivo actualizado correctamente")
        } catch (error) {
             console.error("Error al actualizar el archivo:", error.message)
        }
      }
  
    async getCartByID (id) {
        try {
            const findCart = this.carts.find (cart => cart.id === Number(id))
            if (findCart) return findCart.products
        } catch (error) {
            console.log ('Error al obtener los productos del carrito:', error.message)
          } 
      }


    async addProductInCart (cid, pid) {
        try {
            // Verificar si el carrito existe
            const cartIndex = this.carts.findIndex(cart => cart.id === Number(cid))

            if (cartIndex !== -1) {
                // Verificar si el producto existe en la lista de productos generales
                const product = await this.productManager.getProductByID(pid)

                if (product) {
                    // Verificar si el producto ya está en el carrito
                    const productIndex = this.carts[cartIndex].products.findIndex(prod => prod.product === Number(pid))

                    if (productIndex !== -1) {
                        // Si el producto ya está en el carrito, incrementar la cantidad
                        this.carts[cartIndex].products[productIndex].quantity++
                    } else {
                        // Si el producto no está en el carrito, agregarlo
                        this.carts[cartIndex].products.push({ product: Number(pid), quantity: 1 })
                    }

                    // Guardar los cambios en el archivo
                    await this.updateFile()
                    return { success: true, message: 'Producto agregado correctamente al carrito' }
                } else {
                    // El producto no existe en la lista general de productos
                    return { success: false, message: 'El producto no existe en la lista general de productos.' }
                }
            } else {
                console.error('El carrito con el ID proporcionado no existe.')
                return { success: false, message: 'carrito no encontrado.' }
            }
        } catch (error) {
            console.log('Error al agregar el producto al carrito', error.message)
            return { success: false, message: 'internal server error' }
        }
    }
}

module.exports = CartManager


