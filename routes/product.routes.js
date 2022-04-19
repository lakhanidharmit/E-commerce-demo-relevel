const productController = require('../controllers/product.controller')
const {requestValidator, authJwt} = require('../middleweres')


module.exports = function(app){
    //route for POST request to create the product
    app.post("/ecomm/api/v1/products",[requestValidator.validateProductRequest, authJwt.verifyToken, authJwt.isAdmin],productController.create)

    //route for PUT request to update the product
    app.put("/ecomm/api/v1/products/:id",[requestValidator.validateProductRequest, authJwt.verifyToken, authJwt.isAdmin],productController.update)

    //route for DELETE request to delete the product
    app.delete("/ecomm/api/v1/products/:id",[authJwt.verifyToken, authJwt.isAdmin],productController.delete)

    //route for GET request to get the product
    app.get("/ecomm/api/v1/products/:id",productController.findOne)

    //route for GET request to get the all the products
    app.get("/ecomm/api/v1/products",productController.findAll)

    //route for GET request to get the all the products of given category ID
    app.get("/ecomm/api/v1/categories/:categoryId/products",[requestValidator.validateCategoryInRequestParams],productController.getProductsUnderCategory)
}