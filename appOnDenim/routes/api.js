const express = require("express");
const router = express.Router();

const controller = require("../controllers/apiController");
const authMiddelware = require('../middleware/authMiddelware.js');

router.get("/products/:id", controller.product);
router.post("/checkout", controller.checkout);
router.post("/contact", controller.contact);

module.exports = router;
