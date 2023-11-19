const express = require('express');
const router = express.Router();
const addCartController  = require('../../controllers/customer/AddToCartController');

router.post('/',  addCartController.addCart);

module.exports = router;
