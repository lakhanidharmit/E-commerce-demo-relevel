const controller = require('../controllers/auth.controller');
const {verifySignup} = require('../middleweres')

module.exports = function(app){
    // app.use(function(req,res,next){
    //     res.header(
    //         "Acess-Control-Allow-Headers","x-acess-token, Origin, Content-Type, Accept"
    //     )
    //     next();
    // })
    app.post("/ecomm/api/v1/auth/signup",[verifySignup.checkDuplicateUsernameOrEmail,verifySignup.checkRolesExists],controller.signup);
    app.post("/ecomm/api/v1/auth/signin",controller.signin);
}