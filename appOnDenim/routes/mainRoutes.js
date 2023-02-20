var express = require('express');
var router = express.Router();
const mainController = require('../controllers/mainController.js');
/* GET home page. */
router.get('/', mainController.index);
const authMiddelware = require('../middleware/authMiddelware.js');

router.get('/carrito',authMiddelware, mainController.carrito);


module.exports = router;
