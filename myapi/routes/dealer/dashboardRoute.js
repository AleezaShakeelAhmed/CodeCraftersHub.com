// roomsRoute.js
const express = require("express");
const router = express.Router();
const ViewProductController = require("../../controllers/dealer/dashboardController");
const ViewProductController1 = require("../../controllers/dealer/dashboardController");
const ViewProductController2 = require("../../controllers/dealer/dashboardController");
const ViewProductController3 = require("../../controllers/dealer/dashboardController");
const ViewProductController4 = require("../../controllers/dealer/dashboardController");
const ViewProductController5 = require("../../controllers/dealer/dashboardController");

router.get('/all', ViewProductController.getAllProducts);
router.get('/active', ViewProductController1.getActiveProducts);
router.get('/inactive', ViewProductController2.getInactiveProducts);
router.get('/threshold', ViewProductController3.getThresholdProducts);
router.get('/buy', ViewProductController4.getBuyProducts);
router.get('/stock', ViewProductController5.getStockQuantity);
module.exports = router;
