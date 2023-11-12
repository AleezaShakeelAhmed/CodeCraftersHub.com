// roomsRoute.js
const express = require("express");
const router = express.Router();
const ViewThresholdController = require("../../controllers/dealer/viewThresholdController");

router.get('/', ViewThresholdController.getAllThreshold);
module.exports = router;
