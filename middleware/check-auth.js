const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = (req, res, next) => {
    
    //accessing token in the header instead of query parameter
    try{
        //console.log(req.headers.authorization)
        //console.log(req.headers)
        const token = req.headers.authorization.split(' ')[1] //Authorization: 'Bearer TOKEN'
        //console.log({token})
        if(!token){
            res.status(401).send({
                message:  "Authentication failed."
            })
            return 
        }
        const decodedToken = jwt.verify(token, process.env.JWT_TOKEN_PRIVATE_KEY) //validating token
        req.userData = {id: decodedToken.userId, username: decodedToken.username} //after request after this point this information can be accessed
        next()
    }catch(err){
        res.status(401).send({
            message:  "Authentication failed."
        })
        return
    }
}