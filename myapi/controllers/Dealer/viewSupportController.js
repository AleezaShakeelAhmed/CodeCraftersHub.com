// roomsController.js
const { connection } = require("../../utils/database");
const logs=require('../logs');
function getMessage(req, res){

    // connection.query(`SELECT P.UserId FROM Products P JOIN CustomerSupport CS ON CS.ProductID=P.ProductId`, (err, users) => {
    //     if (err) {
    //         console.error(err);
    //         res.status(500).send('Internal Server Error');
    //     } else {
        try{
            const userId= req.query.userId;
            connection.query(`SELECT * FROM Products P JOIN CustomerSupport CS ON CS.ProductID=P.ProductId WHERE P.UserId=${userId}`, (err, products) => {
                if (err) {
                    logs.log(err,'Dealer','/viewSupportRequest');
                    console.error(err);
                    res.status(500).send('Internal Server Error');
                } else {
                    res.json(products);
                }
                console.log(products[0],products)
            });
        }catch(err){
            logs.log(err,'Dealer','/viewSupportRequest');
          }
    //     }
    // });
};



module.exports = {
    getMessage,
};
