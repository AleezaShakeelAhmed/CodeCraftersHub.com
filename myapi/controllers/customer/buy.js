

// const { connection } = require("../../utils/database");
// const strftime = require("strftime");

// async function buy(req, response) {
//   const productId = req.query.productId;
//   const userId = req.query.userId;
//   const price = req.query.price;
//   const quantity = req.query.quantity;
//   const now = new Date();
//   const dateCreated = strftime("%Y-%m-%d %H:%M:%S", now);

//   // Calculate total price
//   const totalPrice = price * quantity;

//   const data = {
//     ProductId: productId,
//     UserId: userId,
//     Quantity: quantity,
//     UnitPrice: price,
//     TotalPrice: totalPrice,
//     DateCreated: dateCreated,
//   };

//   // Insert data into Inventory table
//   connection.query("INSERT into Inventory SET ?", data, (err, res) => {
//     if (err) {
//       throw err;
//     } else {
//       // Update product quantity in Products table
//       connection.query(
//         `UPDATE Products SET ProductQuantity = ProductQuantity - ${quantity} WHERE ProductId = ${productId}`,
//         (updateErr, updateRes) => {
//           if (updateErr) {
//             throw updateErr;
//           } else {
//             connection.query(`DELETE FROM Cart WHERE ProductId = ${productId} AND UserId = ${userId}`, (error, response1) => {
//               if (error) throw error;
//               else {
                  
//                           console.log("Cart Item deleted successfully");
//                           // res.status(200).json({ message: 'Cart Item deleted successfully' });
//                           response.redirect("http://localhost:3000/Customer/PaymentSuccessful");
//                   }});

//             // response.redirect("http://localhost:3000/Customer/PaymentSuccessful");
//           }
//         }
//       );
//     }
//   });
// }

// module.exports = {
//   buy,
// };

const { connection } = require('../../utils/database');
const strftime = require('strftime');
const logs=require('../logs');

async function buy(req, resp) {
  try {
    const productId = req.query.productId;
    const userId = req.query.userId;
    const price = req.query.price;
    const quantity = req.query.quantity;
    const now = new Date();
    const dateCreated = strftime("%Y-%m-%d %H:%M:%S", now);

    // Calculate total price
    const totalPrice = price * quantity;

    const data = {
      ProductId: productId,
      UserId: userId,
      Quantity: quantity,
      UnitPrice: price,
      TotalPrice: totalPrice,
      DateCreated: dateCreated,
    };

    connection.query('INSERT INTO Inventory SET ?', data, (err, result) => {
      if (err) {
        logs.log(err,'Customer','/buy');
        console.error(err);
        resp.status(500).json({ error: 'Internal Server Error' });
      } else {
        connection.query(
          `UPDATE Products SET ProductQuantity = ProductQuantity - ${quantity} WHERE ProductId = ${productId}`,
          (updateErr, updateRes) => {
            if (updateErr) {
              logs.log(updateErr,'Customer','/buy');
              console.error(updateErr);
              resp.status(500).json({ error: 'Internal Server Error' });
            } else {
              connection.query(`DELETE FROM Cart WHERE ProductId = ${productId} AND UserId = ${userId}`, (deleteErr, response1) => {
                if (deleteErr) {
                  logs.log(deleteErr,'Customer','/buy');
                  console.error(deleteErr);
                  resp.status(500).json({ error: 'Internal Server Error' });
                } else {
                  console.log("Cart Item deleted successfully");

                  const Audit = {
                    userId: req.query.userId,
                    action: "INSERT",
                    oldValue: "N/A",
                    newValue: JSON.stringify(data),
                    date: dateCreated,
                  };

                  connection.query("INSERT INTO BuyAudit SET ?", Audit, (auditErr, auditRes) => {
                    if (auditErr) {
                      logs.log(auditErr,'Customer','/buy');
                      console.error(auditErr);
                      resp.status(500).json({ error: 'Internal Server Error' });
                    } else {
                      console.log('BuyAudit inserted successfully!');
                      console.log('Insert Result:', result);
                      console.log('Inserted');
                      resp.redirect("http://localhost:3000/Customer/PaymentSuccessful");
                    }
                  });
                }
              });
            }
          }
        );
      }
    });
  } catch (error) {
    logs.log(error,'Customer','/buy');
    console.error('An error occurred:', error);
    resp.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  buy,
};

