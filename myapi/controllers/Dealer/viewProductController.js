// roomsController.js
const { connection } = require("../../utils/database");
const logs=require('../logs');

function getAllProducts(req, res){
    const userId=req.query.userId;
    console.log("ss" + userId);
    try{
    connection.query(`SELECT * from Products WHERE UserId=${userId}`, (err, products) => {
        if (err) {
            logs.log(err,'Dealer','/viewProduct');
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.json(products);
        }
    });
}catch{
    logs.log(err,'Dealer','/viewProduct');
  }
};

function getSpecificProducts(req, res){
    try{
    const productId=req.query.productid;
    console.log("ss" + productId);
    connection.query(`SELECT * from Products WHERE ProductId=${productId}`, (err, products) => {
        if (err) {
            logs.log(err,'Dealer','/viewProduct');
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.json(products);
        }
    });
}catch(err){
    logs.log(err,'Dealer','/viewProduct');
  }
};

module.exports = {
    getAllProducts,
    getSpecificProducts,
};
