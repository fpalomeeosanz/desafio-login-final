import { Router } from "express";

const router = Router();

//PUBLIC ACCES
const publicAccess = (req,res,next) => {
    if(req.session.user){
        return res.redirect('/');
    }
    next();
}

//PRIVATE ACCES
const privateAccess = (req,res,next) => {
    if(!req.session.user){
        return res.redirect('/login');
    }
    next();
}

//REGISTER
router.get('/register', publicAccess, (req,res) => {
    res.render('register')
});

//LOGIN
router.get('/login', publicAccess, (req,res) => {
    res.render('login')
})

//PROFILE
router.get('/', privateAccess, (req,res) => {
    res.render('profile', {user:req.session.user})
})

//PRODUCTS
router.get('/products', (req,res) => {
    res.render('products', {user:req.session.user})
})





export { router as viewRouter };