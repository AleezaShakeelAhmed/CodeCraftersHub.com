// productController.js
const { connection } = require("../../utils/database");
const logs=require('../logs');

function updateProductStatus(req, res){
  const productId = req.query.productId;
  const newStatus = req.body.status;
console.log(productId,newStatus);
  if (typeof productId === 'undefined' || typeof newStatus === 'undefined') {
    return res.status(400).json({ error: "Invalid data provided" });
  }
try{
  connection.query(
    'UPDATE Products SET Active = ? WHERE ProductID = ?',
    [newStatus, productId],
    (err, result) => {
      if (err) {
        logs.log(err,'Dealer','/updateStatus');
        console.error("Error updating product status:", err);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        res.json({ success: true });
      }
    }
  );
  }catch(err){
    logs.log(err,'Dealer','/updateStatus');
  }
};

module.exports = {
    updateProductStatus,
};