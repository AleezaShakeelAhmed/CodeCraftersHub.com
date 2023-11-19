// const { connection } = require("../../utils/database");

// const removeCart = (req, res) => {
//     const productId=req.query.productId;
//     const userId=req.query.userId;
//     console.log("ProductID for Delete" + "  " + productId);
//     console.log("UserID for Delete" + "  " + userId);
//     connection.query(`DELETE FROM Cart WHERE ProductId = ${productId} AND UserId = ${userId}`, (error, response) => {
//         if (error) throw error;
//         else {
            
//                     console.log("Cart Item deleted successfully");
//                     res.status(200).json({ message: 'Cart Item deleted successfully' });
//             }});
//         }

// module.exports = {
//     removeCart,
// };


const {connection}=require('../../utils/database');
const strftime = require('strftime');
const logs=require('../logs');

async function removeCart(req,response){
    try{
    const productId=req.query.productId;
    const userId=req.query.userId;
    console.log("ProductID for Delete" + "  " + productId);
    console.log("UserID for Delete" + "  " + userId);
    const now = new Date();
    const dateCreated = strftime('%Y-%m-%d %H:%M:%S', now);

    connection.query(`SELECT * FROM Cart WHERE ProductId=${req.query.productId}`,(err,res)=>{
        if(err) throw err;
        else{
            connection.query('INSERT INTO CartAudit (userId, action, oldValue, newValue,date) VALUES (?, ?, ?, ?,?)', [req.query.userId, 'DELETE', JSON.stringify({ product: res[0]}),'N/A',dateCreated], (err, auditResult) => {
                if(err) {
                    logs.log(err,'Customer','/customerRemoveFromCart');
                }
                else{
                    connection.query(`DELETE FROM Cart WHERE ProductId = ${productId} AND UserId = ${userId}`,(err,res)=>{
                        if(err) {
                            logs.log(err,'Customer','/customerRemoveFromCart');
                        }
                        else{
                            return response.status(200).json({message:"deleted"});
                        }
                    })
                }   
            });
        }
    });
} catch (error) {
    logs.log(error,'Customer','/customerRemoveFromCart');
}
}

module.exports={
    removeCart,
}





