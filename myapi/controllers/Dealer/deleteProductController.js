const {connection}=require('../../utils/database');
const strftime = require('strftime');
const logs=require('../logs');

async function deleteProduct(req,response){
    const now = new Date();
    const dateCreated = strftime('%Y-%m-%d %H:%M:%S', now);
try{
    connection.query(`SELECT * FROM Products WHERE ProductId=${req.query.productId}`,(err,res)=>{
        if(err) {
            logs.log(err,'Dealer','/deleteProduct');
        }
        else{
            connection.query('INSERT INTO ProductAudit (userId, action, oldValue, newValue,date) VALUES (?, ?, ?, ?,?)', [req.query.userId, 'DELETE', JSON.stringify({ product: res[0]}),'N/A',dateCreated], (err, auditResult) => {
                if(err) {
                    logs.log(err,'Dealer','/deleteProduct');
                }
                else{
                    connection.query(`DELETE from Products where ProductId=${req.query.productId}`,(err,res)=>{
                        if(err) {
                            logs.log(err,'Dealer','/deleteProduct');
                        }
                        else{
                            return response.status(200).json({message:"deleted"});
                        }
                    })
                }   
            });
        }
    })
}catch(err){
    logs.log(err,'Dealer','/deleteProduct');
}
}

module.exports={
    deleteProduct,
}




