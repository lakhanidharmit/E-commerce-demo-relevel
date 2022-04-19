const db = require('../models');
const Category = db.category;

exports.create = (req,res)=>{

    const category = {
        name: req.body.name,
        description: req.body.description
    }

    Category.create(category).then(response=>{
        res.status(201).send(response);
    }).catch(err => {
        res.status(500).send({
            message: "some internal error occured while storing the category data!"
        })
    })

}

exports.update = (req,res)=>{
    
    const category = {
        name: req.body.name,
        description: req.body.description
    }
    const categoryId = req.params.id;
    Category.update(category,{
        where:{id:categoryId}
    }).then(response => {
        res.status(200).send({message:"category data updated"});
    }).catch(err =>{
        res.status(500).send({
            message:"some internal error occured while updating category data"
        })
    });
};

exports.delete = (req,res)=>{
    const categoryId = req.params.id;
    Category.destroy({
        where:{
            id:categoryId
        }
    }).then(response => {
        res.sendStatus(200).send(response);
    }).catch(err =>{
        res.sendStatus(500).send({
            message:"some internal error occured while deleting category!"
        })
    });

}

exports.findOne = (req,res) => {
    const categoryId = req.params.id;
    Category.findByPK(categoryId).then(response => {
        res.status(200).send(response);
    }).catch(err =>{
        res.status(500).send({
            message:"some internal error occured while fetching category data"
        })
    });
}

exports.findAll = (req,res)=>{
    let categoryName = req.query.name;
    let promise;
    if(categoryName){
        promise = Category.findAll({
            where:{
                name: categoryName
            }
        })
    }
    else{
        promise = Category.findAll();
    }

    promise.then(response => {
        res.status(200).send(response);
    }).catch(err =>{
        res.status(500).send({
            message:"some internal error occured while fetching all the categories"
        })
    });
}