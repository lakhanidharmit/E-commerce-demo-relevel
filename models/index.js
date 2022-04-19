const Sequelize = require('sequelize');
const dbConfig = require('../config/db.config.json');

const env ="development";
const dbSetting = dbConfig[env];
const sequelize = new Sequelize(
    dbSetting.database,
    dbSetting.username,
    dbSetting.password,
    dbSetting.dialectInformation
);

const db = {sequelize, Sequelize};
db.category = require('./category.model')(sequelize,Sequelize);
db.product = require('./product.model')(sequelize,Sequelize);
db.user = require('./user.model')(sequelize,Sequelize);
db.role = require('./role.model')(sequelize,Sequelize);
db.cart = require('./cart.model')(sequelize,Sequelize);

db.user.hasMany(db.cart);
db.category.hasMany(db.product);

db.product.belongsToMany(db.cart,{
    through: "cart_products",
    foreignKey: "productId",
    otherKey: "cartId"
});
db.cart.belongsToMany(db.product,{
    through: "cart_products",
    foreignKey: "cartId",
    otherKey: "productId"
})
db.role.belongsToMany(db.user,{
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId"
});
db.user.belongsToMany(db.role,{
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId"
});

db.availableRoles = [];

module.exports = db;