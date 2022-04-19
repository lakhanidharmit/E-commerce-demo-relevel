const db = require("../models")

const checkDuplicateUsernameOrEmail = (req,res,next)=>{
    db.user.findOne({
        where:{
            username:req.body.username
        }
    }).then(user=>{
        if(user){
            res.status(400).send({
                message:"username already exists"
            })
            return;
        }
        db.user.findOne({
            where:{
                email:req.body.email
            }
        }).then(email=>{
            if(email){
                res.status(400).send({
                    message:"email already exists"
                })
                return;
            }
            next();
        })
    
    })
}

const checkRolesExists = async (req,res,next)=>{
    if(req.body.roles){
        for (let i = 0; i < req.body.roles.length; i++) {
            let roleIncluded = await db.availableRoles.includes(req.body.roles[i]);
            if(!roleIncluded){
                res.status(400).send({
                    message:"role doesn't exist: "+req.body.roles[i]
                })
                return;
            }            
        }
    }
    next();
}

const verifySignup = {checkDuplicateUsernameOrEmail,checkRolesExists};
module.exports = verifySignup;