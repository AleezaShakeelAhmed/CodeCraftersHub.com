const express = require('express');
const router = express.Router();
const buyProductController  = require('../../controllers/customer/buyProduct');

router.post('/',  buyProductController.buyProduct);

module.exports = router;
