import { Router } from "express";
import userModel from "../models/userModel.js";

const router = Router();

//REGISTER 
router.post('/register', async (req,res)=>{
   
   const { first_name, last_name, email, age, password } = req.body;
   
   const exists = await userModel.findOne({email});

   if(exists){
    return res.status(400)
    .send({
        status:"error",
        error:"El usuario ya existe"
    })
   }

   //USUARIO
   const user = {
        first_name,
        last_name,
        email,
        age,
        password
    }

    let result = await userModel.create(user);

    res.send({
        status:"success",
        message:"Usuario registrado"
    })
})

//LOGIN > PRODUCTS
router.post('/login', async  (req,res)=>{
    const {email, password} = req.body;
    const user = await userModel.findOne({email,password});
    
    if(user.email === "adminCoder@coder.com" + user.password === "adminCod3r123"){
        res.render("/neverGonnaGiveYouUp")
    }

    if(!user){
       return res.status(400).send({
            status:"error",
            error:"Datos incorrectos"
        })
    }
    req.session.user = {
        full_name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        age: user.age
    }
    res.send({
        status:"success",
        payload: req.session.user,
        message:"Mi primer Login!!"
    })
    
})

//LOGOUT
router.get('/logout', (req,res)=>{
    req.session.destroy(err=>{
        if(err){
            return res.status(500).send({
                status: 'error',
                error: 'No se pudo desloguear'
            })
        }
        res.redirect('/login')
    })
})

export { router as sessionRouter }