const express = require('express')
const app = express()
var cors = require('cors')
const mongoose = require('mongoose')
const Post = require('./models/post')
const port = 2500
const userRoutes = require('./routes/user')
const messengerRoutes = require('./routes/message')
const path = require('path')
require('dotenv').config()
mongoose.connect('mongodb+srv://pacski:'+process.env.PASSWORD+'@backendnodejs.4ecle.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
{
    useNewUrlParser: true,
    useUnifiedTopology:true
})
.then(()=> console.log("db valid"))
.catch(()=> console.log("db error"))
/*
app.use('/',(req, res,next) =>{
    res.json({message: "oklm"})
})*/
app.use((req,res,next)=> {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080')
    res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content,Accept,Content-Type,Authorization')
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,DELETE')
    next()
})

var corsOptions = {
    origin: ["http://localhost:8080"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 201, // some legacy browsers (IE11, various SmartTVs) choke on 204
    allowedHeaders: 'Content-Type,Authorization, x-xsrf-token, Access-Control-Allow-Origin',
    exposedHeaders: 'Content-Range,X-Content-Range, Accept-Ranges, Content-Encoding, Content-Length, Content-Range'
}

app.use(cors(corsOptions));

app.use(express.json())
app.use(express.urlencoded({
    extended :true
}))
app.use('/images',express.static(path.join(__dirname,'images')))
app.use('/user',userRoutes)
app.use('/messenger', messengerRoutes)

module.exports = app