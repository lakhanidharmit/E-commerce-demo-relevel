const db = require('../models');
const Product = db.product;

exports.create = (req,res)=>{

    const product = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        categoryId: req.body.categoryId
    }

    Product.create(product).then(response=>{
        res.status(201).send(response);
    }).catch(err => {
        res.status(500).send({
            message: "some internal error occured while storing the product data!"
        })
    })

}

exports.update = (req,res)=>{
    
    const product = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        categoryId: req.body.categoryId
    }
    const productId = req.params.id;
    Product.update(product,{
        where:{id:productId}
    }).then(response => {
        res.status(200).send({message:"product data updated"});
    }).catch(err =>{
        res.status(500).send({
            message:"some internal error occured while updating product"
        })
    });
};

exports.delete = (req,res)=>{
    const productId = req.params.id;
    Product.destroy({
        where:{
            id:productId
        }
    }).then(response => {
        res.sendStatus(200).send(response);
    }).catch(err =>{
        res.sendStatus(500).send({
            message:"some internal error occured while deleting product"
        })
    });

}

exports.findOne = (req,res) => {
    const productId = req.params.id;
    Product.findByPk(productId).then(response => {
        res.status(200).send(response);
    }).catch(err =>{
        res.status(500).send({
            message:"some internal error occured while fetching product"
        })
    });
}

exports.findAll = (req,res)=>{
    let productName = req.query.name;
    let promise;
    if(productName){
        promise = Product.findAll({
            where:{
                name: productName
            }
        })
    }
    else{
        promise = Product.findAll();
    }

    promise.then(response => {
        res.status(200).send(response);
    }).catch(err =>{
        res.status(500).send({
            message:"some internal error occured while fetching all the products"
        })
    });
}

exports.getProductsUnderCategory = (req,res)=>{
    const categoryID = req.params.categoryId;
    Product.findAll({
        where: {
            categoryId: categoryID
        }
    }).then(response =>{
        res.status(200).send(response);
    }).catch(err=>{
        res.sendStatus(500).send({
            message:"some internal error occured while fetching all the products from category ID"
        })
    });

}
