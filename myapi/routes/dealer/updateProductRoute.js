// productRoute.js
const express = require("express");
const router = express.Router();
const multer = require('multer');
const updateProductController = require("../../controllers/dealer/updateProductController");
const {storage}=require('../../utils/multer')
var upload = multer({ storage });


router.put('/', upload.single('img'), updateProductController.updateProduct);

module.exports = router;
