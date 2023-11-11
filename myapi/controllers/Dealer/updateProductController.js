// // productController.js
// const { connection } = require("../../utils/database");
// const strftime = require('strftime');


// function updateProduct(req, res){
//   const productID = req.query.productid;
//   console.log("Product Id for update" + productID)
//   // const updatedProductData = req.body;
//   const pName=req.body.ProductName;
//   const pPrice=parseInt(req.body.ProductPrice);
//   const pQuantity=parseInt(req.body.ProductQuantity);
//   const pThreshold=parseInt(req.body.ThresholdQuantity);
//   const pCategory=req.body.ProductCategory;
//   const pDescription=req.body.ProductDescription;
//   const now = new Date();
//   const dateUpdated = strftime('%Y-%m-%d %H:%M:%S', now);

//   if(req.file){
//     connection.query(`UPDATE Products SET 
//     ProductName='${pName}',
//     ProductPic='${req.file.filename}',
//     ProductPrice='${pPrice}',
//     ProductQuantity='${pQuantity}',
//     ThresholdQuantity='${pThreshold}',
//     ProductCategory='${pCategory}',
//     ProductDescription='${pDescription}', UpdatedAt='${dateUpdated}' WHERE ProductId = ${productID}`,(err, response) => {
//       if (err) {
//         console.error("Error updating product:", err);
//         response.status(500).json({ message: 'Error updating product' });
//       } else {
//         console.log("Product updated successfully");
//         res.sendStatus(200);
//       }
//     }
//   ); 
//   }
//   else{
//     connection.query(`UPDATE Products SET 
//     ProductName='${pName}',
//     ProductPrice='${pPrice}',
//     ProductQuantity='${pQuantity}',
//     ThresholdQuantity='${pThreshold}',
//     ProductCategory='${pCategory}',
//     ProductDescription='${pDescription}', UpdatedAt='${dateUpdated}' WHERE ProductId = ${productID}`,(err, response) => {
//       if (err) {
//         console.error("Error updating product:", err);
//         response.status(500).json({ message: 'Error updating product' });
//       } else {
//         console.log("Product updated successfully");
//         res.sendStatus(200);
//       }
//     }
//   ); 
//   }
// };

// module.exports = {
//     updateProduct,
// };

// productController.js
const { connection } = require("../../utils/database");
const strftime = require('strftime');
const logs=require('../logs');

function updateProduct(req, res) {
  try {
    const UserId = req.query.userId;
    const productID = req.query.productid;
    console.log("Product Id for update" + productID);
    const pName = req.body.ProductName;
    const pPrice = parseInt(req.body.ProductPrice);
    const pQuantity = parseInt(req.body.ProductQuantity);
    const pThreshold = parseInt(req.body.ThresholdQuantity);
    const pCategory = req.body.ProductCategory;
    const pDescription = req.body.ProductDescription;
    const now = new Date();
    const dateUpdated = strftime('%Y-%m-%d %H:%M:%S', now);

    // Fetch old values from the database before the update
    connection.query(`SELECT * FROM Products WHERE ProductId = ?`, [productID], (err, result) => {
      if (err) throw err;

      const oldValues = result[0];

      // Perform the update with parameterized query
      connection.query(
        `UPDATE Products SET 
          ProductName=?,
          ProductPic=?,
          ProductPrice=?,
          ProductQuantity=?,
          ThresholdQuantity=?,
          ProductCategory=?,
          ProductDescription=?,
          UpdatedAt=? WHERE ProductId = ?`,
        [
          pName,
          req.file ? req.file.filename : oldValues.ProductPic,
          pPrice,
          pQuantity,
          pThreshold,
          pCategory,
          pDescription,
          dateUpdated,
          productID
        ],
        (err, response) => {
          if (err) {
            logs.log(err,'Dealer','/updateProduct');
          }

          // Log the audit entry
          const newValues = {
            ProductName: pName,
            ProductPic: req.file ? req.file.filename : oldValues.ProductPic,
            ProductPrice: pPrice,
            ProductQuantity: pQuantity,
            ThresholdQuantity: pThreshold,
            ProductCategory: pCategory,
            ProductDescription: pDescription,
            UpdatedAt: dateUpdated,
          };

          console.log(UserId);

          connection.query(
            'INSERT INTO ProductAudit (userId, action, oldValue, newValue, date) VALUES (?, ?, ?, ?, ?)',
            [UserId, 'UPDATE', JSON.stringify(oldValues), JSON.stringify(newValues), dateUpdated],
            (auditErr, auditResult) => {
              if (auditErr) {
                logs.log(auditErr,'Dealer','/updateProduct');
              }

              console.log("Product updated successfully");
              return res.sendStatus(200);
            }
          );
        }
      );
    });
  } catch (error) {
    logs.log(error,'Dealer','/updateProduct');
    console.error('Unhandled error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

module.exports = {
  updateProduct,
};


