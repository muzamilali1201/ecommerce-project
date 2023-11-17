const User = require('../DB/userModel')
const jwt = require('jsonwebtoken');


// -------Register User--------
const registerUser = async (req,resp)=>{
    const{username,email,password} = req.body;
    let user = await User.create({
        username,
        email,
        password
    })
    user = user.toObject()
    delete user.password
    jwt.sign({user},"abc",{expiresIn:'1h'},(err,token)=>{
        if(err){
            resp.send(err);
        }
        else{
            resp.send({user,auth:token})
        }})
}

// -------Login User-------
const loginUser = async(req,resp)=>{
    const{email,password} = req.body
    if(!password || !email){
        resp.send({message:"All fields are mandatory"})
    }
    const user = await User.findOne({email,password}).select('-password');

    if(user){
        jwt.sign({user},"abc",{expiresIn:'1h'},(err,token)=>{
            if(err){
                resp.send(err);
            }
            else{
                resp.send({user,auth:token})
            }
        })
        
    }
    else{
        resp.send({message:"User not found!"})
    }
}


module.exports = {registerUser,loginUser};