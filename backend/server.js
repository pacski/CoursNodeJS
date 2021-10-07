const { createServer } = require('http')
const app = require('./app')
const server = createServer(app)
const {Server} = require('socket.io')

const io = new Server(server, {
    cors: {
        credentials: true,
        origin: "http://localhost:8080",
        methods: ['GET','HEAD','PUT','PATCH','POST','DELETE']
    }
})

io.on('connection', (socket) => {
    console.log('user connected:'+ socket.connected)
    socket.on('newMessage', (message) => {
        socket.emit('receiveMessage', message)
    })
})

const normalizePort = val => {
    const port = parseInt(val,10)
    if(isNaN(port)){return val;}
    if(port>=0){return port;}
    return false
}
const port = normalizePort(process.env.PORT||2500)
app.set('port',port)

const errorHandler = error =>{
    if(error.syscall !== 'listen'){
        throw error
    }
    const address = server.address()
    const bind = typeof address ==='string' ? 'pipe' + address : 'port: ' +port
    switch(error.code){
        case 'EACCES':
            console.error(bind + 'require Privilege')
            process.exit(1)
            break
        case 'EADDRINUSE':
            console.error(bind + ' already use')
            process.exit(1)
            break
        default:
            throw error
    }
}

server.on('error',errorHandler)
server.on('listening', ()=>{
    const address = server.address()
    const bind = typeof address ==='string' ? 'pipe' + address : 'port: ' +port
    console.log(' ecoute '+ bind)
})

server.listen(port)














