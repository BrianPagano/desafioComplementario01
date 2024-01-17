const express = require('express')
const router = require('./router/router')
const { port } = require('./configs/server.config')
const { Server } = require("socket.io")
const handlebars = require('express-handlebars')
const mongoConnect = require('./db')
const chats = []

const app = express()

// Configuración de Handlebars
const hbs = handlebars.create({
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
  },
})

app.use(express.json())
app.use(express.static(process.cwd() + '/src/public'))

// Configura Express para servir archivos estáticos desde la carpeta 'node_modules/bootstrap/dist'
app.use('/bootstrap', express.static(process.cwd() + '/node_modules/bootstrap/dist'))

app.engine('handlebars', hbs.engine)
app.set('views', process.cwd() + '/src/views')
app.set('view engine', 'handlebars')

const httpServer = app.listen(port, () => {
  console.log(`Server running at port ${port}`)
})

const io = new Server(httpServer);

io.on ('connection', (socket) => {  
  socket.on('newUser', data => {
    socket.broadcast.emit ('userConnected', data)
    socket.emit ('messageLogs', chats)
    
  })
  socket.on ('message', data => {
    chats.push(data) //aca guardo la data en un array
    io.emit ('messageLogs', chats) 
})
})


app.locals.io = io


mongoConnect()

router(app)





