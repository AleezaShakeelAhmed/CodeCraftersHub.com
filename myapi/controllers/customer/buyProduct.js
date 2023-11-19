const { connection } = require("../../utils/database");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const logs=require('../logs');
async function buyProduct(req, response) {
  try{
  const productId = req.body.productId;
  const userId = req.body.userId;
  const price = req.body.price;
  const Quantity = req.body.quantity;
//   const image = req.body.image;
 

  connection.query(
    `SELECT * FROM Products WHERE ProductId=${productId}`,
    async (err, res) => {
      if (err) throw err;
      else {
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          line_items: [
            {
              price_data: {
                currency: "pkr",
                product_data: {
                  name: "Product",
                //   images: [`http://localhost:4000/images/${image}`],
                },
                unit_amount: price * 100,    
              },
              quantity: Quantity,
            },
          ],
          mode: "payment",
          success_url: `http://localhost:4000/buy?session_id={CHECKOUT_SESSION_ID}&productId=${productId}&userId=${userId}&price=${price}&quantity=${Quantity}`,
          cancel_url: "http://localhost:3000/cancel",
        });
        console.log("Session Response:", session);
        response.status(200).json({ sessionUrl: session.url });
      }
    }
  );
} catch(err){
  logs.log(err,'Customer','/customerAddToCart');
}
}

module.exports = {
  buyProduct,
};

// const { connection } = require("../../utils/database");
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// async function buyProduct(req, response) {
//   const productId = req.body.productId;
//   const userId = req.body.userId;
//   const price = req.body.price;
//   const quantity = req.body.quantity;

//   connection.query(
//     `SELECT * FROM Products WHERE ProductId=${productId}`,
//     async (err, product) => {
//       if (err) {
//         throw err;
//       }
//       if (product[0].ProductQuantity >= quantity) {
//         const newQuantity = product[0].ProductQuantity - quantity;
//         console.log(newQuantity);

//         // Update the product quantity in the Products table
//         connection.query(
//           `UPDATE Products SET ProductQuantity=${newQuantity} WHERE ProductId=${productId}`,
//           (updateErr) => {
//             if (updateErr) {
//               throw updateErr;
//               console.log("this is error")
//             }
//             async function checkout(){

//             const session = await  stripe.checkout.sessions.create({
//               payment_method_types: ["card"],
//               line_items: [
//                 {
//                   price_data: {
//                     currency: "pkr",
//                     product_data: {
//                       name: "Product",
//                     },
//                     unit_amount: price * 100,
//                   },
//                   quantity: quantity,
//                 },
//               ],
//               mode: "payment",
//               success_url: `http://localhost:4000/buy?session_id={CHECKOUT_SESSION_ID}&productId=${productId}&userId=${userId}&price=${price}&quantity=${quantity}`,
//               cancel_url: "http://localhost:3000/cancel",
//             });
//             return session.url;
//           }
//           checkout().then((url)=>response.redirect(url))
//         .catch((error)=>console.log(error));

//             // console.log("Session Response:", session);
//             // response.status(200).json({ sessionUrl: session.url });
            
//           }
//         );
//       } else {
//         // If the requested quantity is not available, return an error response
//         response.status(400).json({ message: "Stock is unavailable" });
//       }
//     }
//   );
// }

// module.exports = {
//   buyProduct,
// };
