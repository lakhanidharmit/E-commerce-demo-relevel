const cartController = require('../controllers/cart.controller');
const {authJwt} = require('../middleweres')

module.exports = function(app){
    app.post("/ecomm/api/vi/carts", [authJwt.verifyToken], cartController.create)
    app.put("/ecomm/api/vi/carts/:id", [authJwt.verifyToken], cartController.update)
    app.get("/ecomm/api/vi/carts/:id", [authJwt.verifyToken], cartController.getCart)
}