const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = (req, res, next) => {
    
    //accessing token in the header instead of query parameter
    try{
        const token = req.query.token
        console.log({token})
        if(!token){
            next()
        }
        const decodedToken = jwt.verify(token, process.env.JWT_TOKEN_PRIVATE_KEY) //validating token
        console.log({decodedToken})
        req.userData = {id: decodedToken.userId, username: decodedToken.username} //after request after this point this information can be accessed
        next()
    }catch(err){
        console.log('no token')
        return
    }
}