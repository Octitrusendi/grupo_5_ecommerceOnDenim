var express = require('express');
var router = express.Router();
const mainController = require('../controllers/mainController.js');
/* GET home page. */
router.get('/', mainController.index);

router.get('/carrito', mainController.carrito);


module.exports = router;
