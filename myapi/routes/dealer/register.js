const express = require('express');
const router = express.Router();
const dealerController = require('../../controllers/dealer/register');

router.post('/', dealerController.registerDealer);

module.exports = router;
