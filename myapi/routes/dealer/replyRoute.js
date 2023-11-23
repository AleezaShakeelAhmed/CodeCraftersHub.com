const express = require('express');
const router = express.Router();
const replyController = require('../../controllers/dealer/replyController');

router.post('/', replyController.reply);

module.exports = router;