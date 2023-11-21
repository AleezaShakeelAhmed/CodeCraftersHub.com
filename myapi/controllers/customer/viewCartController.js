// roomsController.js
const { connection } = require("../../utils/database");
const logs=require('../logs');

function viewCartProducts(req, res){
    try{
    const userId=req.query.UserId;
    console.log("ss" + userId);
    connection.query(`SELECT * from Cart C JOIN Products P ON C.ProductId=P.ProductId WHERE C.UserId=${userId}`, (err, products) => {
        if (err) {
            logs.log(err,'Customer','/customerRemoveFromCart');
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.json(products);
        }
    });
} catch (error) {
    logs.log(error,'Customer','/customerViewCart');
}
};


module.exports = {
    viewCartProducts,
};
