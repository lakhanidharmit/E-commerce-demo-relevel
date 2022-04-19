const categoryController = require('../controllers/category.controller')
const {requestValidator, authJwt} = require('../middleweres')

module.exports = function(app){
    //route for POST request to create the category
    app.post("/ecomm/api/v1/categories",[requestValidator.validateCategoryRequest, authJwt.verifyToken, authJwt.isAdmin],categoryController.create)

    //route for PUT request to update the category
    app.put("/ecomm/api/v1/categories/:id",[requestValidator.validateCategoryRequest, authJwt.verifyToken, authJwt.isAdmin],categoryController.update)

    //route for DELETE request to delete the category
    app.delete("/ecomm/api/v1/categories/:id",[authJwt.verifyToken, authJwt.isAdmin],categoryController.delete)

    //route for GET request to get the category
    app.get("/ecomm/api/v1/categories/:id",categoryController.findOne)

    //route for GET request to get the all the categories
    app.get("/ecomm/api/v1/categories",categoryController.findAll)
}