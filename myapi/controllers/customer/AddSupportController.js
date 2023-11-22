const { connection } = require('../../utils/database');
const strftime = require('strftime');
const logs=require('../logs');

async function addSupport(req, res) {
  try {
    const now = new Date();
    const dateCreated = strftime('%Y-%m-%d %H:%M:%S', now);
    const userId=req.query.userId;


    // Log user ID for debugging
    console.log('User ID:', req.query.userId);
    console.log('Product ID:', req.query.productId);

    const SupportData = {
      UserId: userId,
      CustomerEmail:req.body.email,
      Title:req.body.subject,
      Description:req.body.body,
      DateCreated: dateCreated,
      Active: false,
      ProductID: req.query.productId,
    };

    console.log('SupportvData:', SupportData);

    // Insert product data into the Products table
    connection.query('INSERT INTO CustomerSupport SET ?', SupportData, (err, result) => {
      if (err) {
        logs.log(err,'Customer','/customerSupport');
        console.error('Error inserting data into MySQL database:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }

      // Log success and result for debugging
      console.log('Support Data inserted successfully!');
      console.log('Insert Result:', result);

      // Send a response to the client
      console.log('Inserted');
      res.redirect('http://localhost:3000/Customer/CustomerSupport');
    });
  } catch (error) {
    logs.log(error,'Customer','/customerSupport');

    console.error('An error occurred:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  addSupport,
};

