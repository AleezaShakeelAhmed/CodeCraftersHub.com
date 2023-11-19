const { connection } = require('../../utils/database');
const strftime = require('strftime');
const logs=require('../logs');

async function addCart(req, resp) {
  try {
        const now = new Date();
        const dateCreated = strftime('%Y-%m-%d %H:%M:%S', now);
    
        console.log('User ID:', req.body.userId);
        console.log('Product ID:', req.body.productId);

        const cartData = {
          ProductId: req.body.productId,
          UserId: req.body.userId,
          CreatedAt: dateCreated,
          UpdatedAt: dateCreated,
          Active: true,
        };
    
        console.log('Cart Data:', cartData);

    connection.query('INSERT INTO Cart SET ?', cartData, (err, result) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          logs.log(err,'Customer','/customerAddToCart');
          console.error('Duplicate entry. This combination already exists in the Cart table.');
          resp.status(400).json({ error: 'Duplicate entry' });
        } else {
          logs.log(err,'Customer','/customerAddToCart');
          console.error('Error inserting data into MySQL database:', err);
          resp.status(500).json({ error: 'Internal Server Error' });
        }
        return;
      }
      else{
            const Audit = {
              userId: req.body.userId,
              action: "INSERT",
              oldValue: "N/A",
              newValue: JSON.stringify(cartData),
              date: dateCreated,
            };
            connection.query(
              "INSERT INTO CartAudit SET ?",
              Audit,
              (err, res) => {
                if (err) throw err;
                else {
                  console.log('Cart data inserted successfully!');
                  console.log('Insert Result:', result);
                  console.log('Inserted');
                  // res.redirect('http://localhost:3000/CustomerViewProducts');
                  return resp.status(200).json({ message: "added" });
                }
              }
            );
          }
    });
  } catch (error) {
    logs.log(error,'Customer','/customerAddToCart');
    console.error('An error occurred:', error);
    resp.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  addCart,
};