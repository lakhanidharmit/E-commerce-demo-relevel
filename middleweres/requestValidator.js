const { category } = require("../models");

const validateCategoryRequest = (req,res,next)=>{

    if (!req.body.name){
        res.status(400).send({
            message:"Name of category can't be empty"
        })
        return;
    }
    next();

}

const validateProductRequest = (req,res,next)=>{
    if (!req.body.name || !req.body.price){
        res.status(400).send({
            message:"Name or price of product can't be empty"
        })
        return;
    }else{
        if(req.body.categoryId){
            category.findByPk(req.body.categoryId).then(response => {
                if(!response){
                    res.status(400).send({
                        message:`Category ID ${req.body.categoryId} is not valid`
                    })
                    return;
                }else{
                    if (!req.body.price || req.body.price <= 0){
                        res.status(400).send({
                            message:"enter correct price"
                        })
                        return; 
                    }else{
                        next();
                    }            
                }
            })
        }else{
            res.status(400).send({
                message:"Category ID of a product is not available!"
            })
            return;
        }
    }
}

const validateCategoryInRequestParams = (req,res,next)=>{
    const categoryId = req.params.categoryId;
    if(categoryId){
        category.findByPk(categoryId).then(response => {
            if(!response){
                res.status(400).send({
                    message:`Category ID ${req.params.categoryId} is not valid`
                })
                return;
            }else{
                next()
            }
        }).catch(err=>{
            res.status(500).send({
                message: "some internal error occured"
            })
        })
    }else{
        res.status(400).send({
            message:`Category ID is not provided`
        })
        return;
    }
}

module.exports = {validateCategoryRequest,validateProductRequest,validateCategoryInRequestParams};