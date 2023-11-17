// viewController.js
const { connection } = require("../../utils/database");
const logs=require('../logs');

function getAllProductsForCustomer(req, res){
    try{
    connection.query(`SELECT * from Products    where Active=1`, (err, products) => {
        if (err) {
            logs.log(err,'Customer','/customerViewProduct');
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.json(products);
        }
    });
} catch(err){
    logs.log(err,'Customer','/customerViewProduct');
  }
};
//specific
function getSpecificProductsForCustomer(req, res){
    try{
    const productId=req.query.productID;
    console.log("ss" + productId);
    connection.query(`SELECT * from Products WHERE ProductId=${productId}`, (err, products) => {
        if (err) {
            logs.log(err,'Customer','/customerViewProduct');
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.json(products);
        }
    });
} catch(err){
    logs.log(err,'Customer','/customerViewProduct');
  }
};

function getBuyProductsForCustomer(req, res){
    try{
    const userId=req.query.userID;
    console.log("ss" + userId);
    connection.query(`SELECT * from Inventory I JOIN Products P ON I.ProductId=P.ProductId WHERE I.UserId=${userId}`, (err, products) => {
        if (err) {
            logs.log(err,'Customer','/customerViewProduct');
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.json(products);
        }
    });
} catch(err){
    logs.log(err,'Customer','/customerViewProduct');
  }
};

//category
function getProductsByCategory(req, res) {
    try {
        const category = req.query.category;
        console.log(category);
        connection.query(`SELECT * FROM Products WHERE ProductCategory='${category}'`, (err, products) => {
            if (err) {
                logs.log(err, 'Customer', '/customerViewProduct');
                console.error(err);
                res.status(500).send('Internal Server Error');
            } else {
                res.json(products);
            }
        });
    } catch (err) {
        logs.log(err, 'Customer', '/customerViewProduct');
    }
}


module.exports = {
    getAllProductsForCustomer,
    getSpecificProductsForCustomer,
    getBuyProductsForCustomer,
    getProductsByCategory
};
