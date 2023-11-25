// roomsRoute.js
const express = require("express");
const router = express.Router();
const ViewSupportController = require("../../controllers/dealer/viewSupportController");

router.get('/', ViewSupportController.getMessage);

module.exports = router;
