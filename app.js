const express = require('express');
const app = express();
const serverConfig = require('./config/server.config')
const db = require('./models');
const init = require('./init')
const bodyParser = require('body-parser');
app.use(bodyParser.json());

db.sequelize.sync({force:true}).then(()=>{
    console.log("#### models/tables are dropped and recreated #####");
    init();
})

require('./routes/category.routes')(app);
require('./routes/product.routes')(app);
require('./routes/auth.routes')(app);
require('./routes/cart.routes')(app);

app.listen(serverConfig.PORT, ()=>{
    console.log("#### server is running ####");
});