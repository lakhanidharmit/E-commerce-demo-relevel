const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const db = require('../models');
const config = require('../config/auth.config');

const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;

//signup
exports.signup = (req,res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10)
    }).then(user => {
        console.log("#### user created ####");
        if(req.body.roles){
            Role.findAll({
                where:{
                    name:{
                        [Op.or]: req.body.roles
                    }
                }
            }).then(roles =>{
                user.setRoles(roles).then(()=>{
                    res.status(201).send({message:"user registered sucessfully"})
                })
            })
        }else{
            Role.findAll({
                where:{
                    name:"customer"
                }
            }).then(role=>{
                user.setRoles(role).then(resp =>{
                    res.status(201).send({message:"user registered sucessfully"})
                }).catch(err=>{
                    res.send(500).send({message:"internal server error"})
                })
            })
        }
    }).catch(err=>{
        res.status(500).send({message:err.message});        
    });
}


//signin
exports.signin = (req,res) => {
    User.findOne({
        where:{
            username: req.body.username
        }
    }).then(user=>{
        if(!user){
            return res.status(404).send({message:"user not found"});
        }
        
        var isValidPassword = bcrypt.compareSync(req.body.password,user.password);
        if(!isValidPassword){
            return res.status(401).send({message:"Invalid Password"});
        }

        var token = jwt.sign({id:user.id},config.secret,{
            expiresIn: 86400 // 24 hours
        })

        var authorities = [];
        user.getRoles().then(roles=>{
            for (let i = 0; i < roles.length; i++) {
                authorities.push("ROLE_"+roles[i].name.toUpperCase());               
            }

            res.status(200).send({
                id: user.id,
                username: user.username,
                email: user.email,
                roles: authorities,
                accessToken: token
            })
    
        })
    }).catch(err=>{
        res.status(500).send({message:err.message});
    })
}