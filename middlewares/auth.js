const jwt = require('jsonwebtoken')
const config = require('config')

function auth(req, res, next) {
    const token = req.header('x-auth-header')
    if (!token) return res.status(401).send('Access denind, no token provided')
    
    try{
        const decode = jwt.verify(token, config.get('jwtPrivateKey'))
        req.user = decode
        next()
    } catch(ex){
        res.status(400).send('Invalid token')
    }
}
    module.exports = auth
    