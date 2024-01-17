const mongoose = require ('mongoose')

const mongoConnect = async () => {
    try{
       await mongoose.connect('mongodb+srv://bapagano:pepepepe@ecommerce.x2wirew.mongodb.net/ecommerce?retryWrites=true&w=majority')
       console.log ('db is connected')
    } catch (error) {
        console.error(error)
    }
}

module.exports = mongoConnect