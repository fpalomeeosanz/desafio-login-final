import express from "express";
import handlebars from "express-handlebars";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";


import __dirname from "./utils.js";
import { viewRouter } from "./routes/views.routes.js";
import { sessionRouter } from "./routes/sessions.routes.js";


const PORT = 8080;

const MONGO = "mongodb+srv://fpalomerosanz:fpalomerosanz@cluster0.xx4eski.mongodb.net/e-commerce"
const connection = mongoose.connect(MONGO)

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));
app.use(session({
    store: new MongoStore({
        mongoUrl: MONGO,
       // ttl:3600
    }),
    secret:"CoderSecret",
    resave:false,
    saveUninitialized:false
}))

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use('/', viewRouter);
app.use('/api/sessions', sessionRouter);


//SERVER
const server = app.listen(PORT, ()=>{
    console.log(`Servidor funcionando en el puerto ${PORT}`);
})

//SET COOKIE
app.get("/set", (req,res)=>{
    req.session.user = "Active Session";
    console.log(req.session.user);
    res.send("Session Set");
})
//TEST SESSION
app.get('/test', (req,res)=>{
    res.send(req.session.user);
})
//COOKIE SET
app.post('/cookie', (req,res)=>{
    const data = req.body;
    console.log(data);
    res.cookie('CoderCookie', data, {maxAge: 10000})
    .send({
        status: "success",
        message:"cookie set"
    }); 
})
//COOKIES
app.get('/cookies', (req,res)=>{
    res.render('cookies')
})
//CONTADOR
let contador = 1;
app.get('/contador', (req,res)=>{
    const nombre = req.query.nombre;
    if(!req.session.user){
        req.session.user = {
            nombre: nombre
        }
        return res.send( `Bienvenido, ${req.session.user.nombre}`)
    }else{
        return res.send(`Hola, ${req.session.user.nombre}. Has visitado esta ruta ${++contador} veces.`)   
    }
})
