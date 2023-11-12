// roomsController.js
const { connection } = require("../../utils/database");
const logs=require('../logs');

function getAllThreshold(req, res){
    try{
    const userId=req.query.userId;
    console.log("ss" + userId);
    connection.query(`SELECT * from Products WHERE UserId=${userId} AND ProductQuantity <= ThresholdQuantity`, (err, products) => {
        if (err) {
            logs.log(err,'Dealer','/viewThreshold');
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.json(products);
        }
    });
}catch(err){
    logs.log(err,'Dealer','/viewThreshold');
  }
};



module.exports = {
    getAllThreshold,
};
