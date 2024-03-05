export function auth(req, res, next) {
    if(req.session?.user === 'adminCoder@coder.com' + req.session?.password === 'adminCod3r123' && req.session?.admin){
        return next();
    }
    return res.status(401).send('error de autorizacion')
};