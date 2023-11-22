const express = require('express');
const router = express.Router();
const addSupportController = require('../../controllers/customer/AddSupportController');

router.post('/', addSupportController.addSupport);

module.exports = router;
