// roomsRoute.js
const express = require("express");
const router = express.Router();
const ViewProductController = require("../../controllers/dealer/viewProductController");
const ViewProductController1 = require("../../controllers/dealer/viewProductController");

router.get('/all', ViewProductController.getAllProducts);
router.get('/specific', ViewProductController1.getSpecificProducts);
module.exports = router;
