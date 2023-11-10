const { connection } = require('../../utils/database');
const strftime = require('strftime');
const logs=require('../logs');

async function addProduct(req, resp) {
  try {
    const now = new Date();
    const dateCreated = strftime('%Y-%m-%d %H:%M:%S', now);

    // Log user ID for debugging
    console.log('User ID:', req.query.UserId);

    // Log other relevant data for debugging
    console.log('Product Name:', req.body.prodName);
    console.log('Product Price:', req.body.ProdPrice);
    console.log('Product Quantity:', req.body.ProdQuantity);
    console.log('Threshold Quantity:', req.body.ProdThreshold);
    console.log('Product Category:', req.body.prodCategory);
    console.log('Product Description:', req.body.prodDescription);

    // Construct product data
    const productData = {
      UserId: req.query.UserId,
      ProductPic: req.file.filename,
      ProductName: req.body.prodName,
      ProductPrice: parseInt(req.body.ProdPrice),
      ProductQuantity: parseInt(req.body.ProdQuantity),
      ThresholdQuantity:parseInt( req.body.ProdThreshold),
      ProductCategory: req.body.prodCategory,
      ProductDescription: req.body.prodDescription,
      CreatedAt: dateCreated,
      UpdatedAt: dateCreated,
      Active: true,
    };

    console.log('Product Data:', productData);

    connection.query('INSERT INTO Products SET ?', productData, (err, result) => {
      if (err) {
        logs.log(err,'Dealer','/addProduct');
        console.error('Error inserting data into MySQL database:', err);
        resp.status(500).json({ error: 'Internal Server Error' });
        return;
      }

      else{
            const Audit = {
              userId: req.query.UserId,
              action: "INSERT",
              oldValue: "N/A",
              newValue: JSON.stringify(productData),
              date: dateCreated,
            };
            connection.query(
              "INSERT INTO ProductAudit SET ?",
              Audit,
              (err, res) => {
                if (err) {
                  logs.log(err,'Dealer','/addProduct');
                }
                else {
                  console.log('Product inserted successfully!');
                  console.log('Insert Result:', result);
                  console.log('Inserted');
                  // resp.redirect('http://localhost:3000/AddProduct');
                  return resp.status(200).json({ message: "added" });
                }
              }
            );
          }
    });
  } catch (error) {
    // Log any unexpected errors
    logs.log(error,'Dealer','/addProduct');
    console.error('An error occurred:', error);
    resp.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  addProduct,
};
