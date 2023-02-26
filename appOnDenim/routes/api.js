const express = require("express");
const router = express.Router();

const controller = require("../controllers/apis/apiController");
const authMiddelware = require('../middleware/authMiddelware.js');

router.get("/products/:id", controller.product);
router.post("/checkout", controller.checkout);
router.post("/contact", controller.contact);
router.get("/users", controller.users);
router.get("/cards", controller.cards);
//router.get("/masComprados", controller.masComprados);


module.exports = router;
