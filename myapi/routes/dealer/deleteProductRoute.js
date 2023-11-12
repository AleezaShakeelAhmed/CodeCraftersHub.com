const express = require("express");
const router = express.Router();
const productController = require("../../controllers/dealer/deleteProductController");


router.delete('/', productController.deleteProduct);
module.exports = router;
