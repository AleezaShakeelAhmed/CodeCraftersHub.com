const express = require('express');
const router = express.Router();
const multer = require('multer');
const addProductController  = require('../../controllers/dealer/addProductController');
const {storage}=require('../../utils/multer')
var upload = multer({ storage });

// Define your route
router.post('/', upload.single('img'), addProductController.addProduct);

module.exports = router;
