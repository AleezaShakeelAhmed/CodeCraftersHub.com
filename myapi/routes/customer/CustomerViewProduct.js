// roomsRoute.js
const express = require("express");
const router = express.Router();
const CustomerViewProductController = require("../../controllers/customer/CustomerViewProduct");
const CustomerViewProductController1 = require("../../controllers/customer/CustomerViewProduct");
const CustomerViewProductController2 = require("../../controllers/customer/CustomerViewProduct");
const CustomerViewProductController3 = require("../../controllers/customer/CustomerViewProduct");

router.get('/all', CustomerViewProductController.getAllProductsForCustomer);
router.get('/specific', CustomerViewProductController1.getSpecificProductsForCustomer);
router.get('/buy', CustomerViewProductController2.getBuyProductsForCustomer);
router.get('/category', CustomerViewProductController3.getProductsByCategory);
module.exports = router;
