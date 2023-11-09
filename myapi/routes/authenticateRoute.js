const express = require('express');
const authenticateController = require('../utils/middleware');
// const authenticateController1 = require('../utils/middleware');

const router = express.Router();

router.get('/', authenticateController.authenticateToken);
// router.get('/aRole', authenticateController1.authorizeRole);

module.exports = router;