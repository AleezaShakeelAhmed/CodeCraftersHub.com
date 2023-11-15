const express = require('express');
const router = express.Router();
const customerController = require('../../controllers/customer/register');

router.post('/', customerController.registerCustomer);

module.exports = router;
