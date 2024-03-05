export function auth(req, res, next) {
    if(req.session?.user === 'fpalomerosanz' && req.session?.admin){
        return next()
    }
    return res.status(401).send('error de autorizacion')
};