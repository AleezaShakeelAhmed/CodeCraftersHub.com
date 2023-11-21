// roomsRoute.js
const express = require("express");
const router = express.Router();
const ViewProductController = require("../../controllers/customer/viewCartController");

router.get('/', ViewProductController.viewCartProducts);
module.exports = router;
