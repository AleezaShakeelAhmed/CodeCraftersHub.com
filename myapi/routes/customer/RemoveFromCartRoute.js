const express = require("express");
const router = express.Router();
const removeController = require("../../controllers/customer/RemoveFromCartController");


router.delete('/', removeController.removeCart);
module.exports = router;
