module.exports = (sequelize,Sequelize) => {
    const Product = sequelize.define("product",{
    id:{
        type:Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        type:Sequelize.STRING,
        allownull: false
    },
    description:{
        type:Sequelize.STRING
    },
    price:{
        type:Sequelize.INTEGER,
        allownull: false
    }
},
{
    tableName:'products'
});
return Product;
}