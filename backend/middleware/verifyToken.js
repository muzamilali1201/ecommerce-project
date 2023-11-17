const jwt = require('jsonwebtoken')
const verifyToken = (req,resp,next)=>{
    let token = req.headers['authorization'];
    if(token){
        token = token.split(' ')[1];
        jwt.verify(token,'abc',(err,valid)=>{
            if(err){
                resp.status(401).send({message:'Token is not valid'})
            }
            else{
                next()
            }
        })
    }
    else{
        resp.send({message:'Token not found!'})
    }
}

module.exports = verifyToken