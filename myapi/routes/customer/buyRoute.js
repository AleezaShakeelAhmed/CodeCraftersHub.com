const express = require('express');
const router = express.Router();
const buyController  = require('../../controllers/customer/buy');

router.get('/',  buyController.buy);

module.exports = router;
