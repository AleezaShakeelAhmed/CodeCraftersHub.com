const { connection } = require("../../utils/database");
const logs=require('../logs');

function getRevenue(req, res){
    try{
    const userId=req.query.userId;
    console.log("ss" + userId);
    connection.query(`SELECT * from Products P JOIN Inventory I ON P.ProductId=I.ProductId JOIN Customer C ON I.UserId=C.UserId WHERE P.UserId=${userId}`, (err, products) => {
        if (err) {
            logs.log(err,'Dealer','/viewRevenue');
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.json(products);
        }
    });
}catch(err){
    logs.log(err,'Dealer','/viewRevenue');
  }
};



module.exports = {
    getRevenue,
};
