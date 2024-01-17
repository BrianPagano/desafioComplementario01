const { Router } = require('express')
const router = Router()
const message = require('../DAO/models/messages.model')

router.get('/', async (req, res) => {
    try {
     res.render ('chat', {style:'style.css'})   
    } catch (error) {
        console.error ('Error al cargar el chat:', error.message)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

module.exports = router