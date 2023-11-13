// roomsController.js
const { connection } = require("../../utils/database");
const logs=require('../logs');

function getAllProducts(req, res){
    const userId=req.query.userId;
    console.log("ss" + userId);
    try{
    connection.query(`SELECT Count(*) As Count from Products WHERE UserId=${userId}`, (err, products) => {
        if (err) {
            logs.log(err,'Dealer','/dashboard');
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.json(products);
        }
    });
}catch{
    logs.log(err,'Dealer','/dashboard');
}
};

function getActiveProducts(req, res){
    const userId=req.query.userId;
    console.log("ss" + userId);
    try{
    connection.query(`SELECT Count(*) As Count from Products WHERE UserId=${userId} AND Active=1`, (err, products) => {
        if (err) {
            logs.log(err,'Dealer','/dashboard');
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.json(products);
        }
    });
}catch{
    logs.log(err,'Dealer','/dashboard');
}
};

function getInactiveProducts(req, res){
    const userId=req.query.userId;
    console.log("ss" + userId);
    try{
    connection.query(`SELECT Count(*) As Count from Products WHERE UserId=${userId}  AND Active=0`, (err, products) => {
       console.log(products);
        if (err) {
            logs.log(err,'Dealer','/dashboard');
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.json(products);
        }
    });
}catch{
    logs.log(err,'Dealer','/dashboard');
}
};

function getThresholdProducts(req, res){
    const userId=req.query.userId;
    console.log("ss" + userId);
    try{
    connection.query(`SELECT Count(*) As Count from Products WHERE UserId=${userId} AND ProductQuantity <= ThresholdQuantity`, (err, products) => {
        if (err) {
            logs.log(err,'Dealer','/dashboard');
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.json(products);
        }
    });
}catch{
    logs.log(err,'Dealer','/dashboard');
}
};

function getBuyProducts(req, res){
    const userId=req.query.userId;
    console.log("ss" + userId);
    try{
    connection.query(`SELECT Sum(I.Quantity) As Count from Products P JOIN Inventory I ON P.ProductId=I.ProductId JOIN Customer C ON I.UserId=C.UserId WHERE P.UserId=${userId}`, (err, products) => {
        if (err) {
            logs.log(err,'Dealer','/dashboard');
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.json(products);
        }
    });
}catch{
    logs.log(err,'Dealer','/dashboard');
}
};

function getStockQuantity(req, res){
    const userId=req.query.userId;
    console.log("ss" + userId);
    try{
    connection.query(`SELECT Sum(ProductQuantity) As Count from Products WHERE UserId=${userId}`, (err, products) => {
        if (err) {
            logs.log(err,'Dealer','/dashboard');
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.json(products);
        }
    });
}catch(err){
    logs.log(err,'Dealer','/dashboard');
}
};

module.exports = {
    getAllProducts,
    getThresholdProducts,
    getActiveProducts,
    getInactiveProducts,
    getBuyProducts,
    getStockQuantity,
};
