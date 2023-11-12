// productRoute.js
const express = require("express");
const router = express.Router();
const productController = require("../../controllers/dealer/updateStatusController");

router.put('/', productController.updateProductStatus);

module.exports = router;
