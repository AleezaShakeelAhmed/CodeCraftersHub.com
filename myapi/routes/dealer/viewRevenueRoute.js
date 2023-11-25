// roomsRoute.js
const express = require("express");
const router = express.Router();
const ViewRevenueController = require("../../controllers/dealer/viewRevenueController");

router.get('/', ViewRevenueController.getRevenue);
module.exports = router;
