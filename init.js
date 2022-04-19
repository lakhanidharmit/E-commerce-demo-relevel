const db = require('./models');


module.exports = function () {

    var rolesdata = [
        {id: 1,
        name:"customer"},
        {id: 2,
        name: "admin"}
    ]

    var categoriesData = [
        {name: "Electronics",
        description:"this category contains electrical appliances"},
        {name:"Vegitables",
        description:"This category contains vegitables"},
    ]
    
    var productsdata = [
        {name: "Smartphone",
        price: 10000,
        categoryId: 1},
        {name: "Feature phone",
        price: 1000,
        categoryId: 1},
        {name: "Potato",
        price: 50,
        categoryId: 2}
    ]

    db.category.bulkCreate(categoriesData).then(()=>{
        console.log("#### category table is initialised with category data ####");
    }).catch((err)=>{
        console.log("#### Error in initializing categories Table ####", err);
    })

    db.product.bulkCreate(productsdata).then(()=>{
        console.log("#### product table is initialised with products data ####");
    }).catch((err)=>{
        console.log("#### Error in initializing products Table ####", err);
    })

    db.role.bulkCreate(rolesdata).then(()=>{
        db.availableRoles.push("customer","admin")
        console.log("#### roles table is initialised with roles data ####");
    }).catch((err)=>{
        console.log("#### Error in initializing roles Table ####", err);
    })
};
