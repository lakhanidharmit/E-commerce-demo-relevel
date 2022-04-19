const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');
const db = require('../models')

verifyToken = (req,res,next)=>{
    let token = req.headers["x-access-token"];
    if(!token){
        return res.status(403).send({
            message: "No token provided!"
        });
    }
    
    jwt.verify(token,config.secret,(err,decoded)=>{
        if(err){
            return res.status(401).send({
                message:"Unauthorised token provided"
            });
        }
        req.userId = decoded.id;
        next();
    });
}

isAdmin = (req,res,next)=>{
    db.user.findByPk(req.userId).then(user=>{
        user.getRoles().then(roles=>{
            for (let i = 0; i < roles.length; i++) {
                if(roles[i].name === "admin"){
                    next();
                    return;
                }                
            }
            res.status(403).send({message:"this action requires admin role"});
            return;
        });
    });
}

const authJwt = {verifyToken, isAdmin}
module.exports = authJwt