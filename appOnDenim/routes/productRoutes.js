var express = require('express');
var router = express.Router();
const productController = require('../controllers/productController.js');

router.get('/:jeanID', productController.detalle);

module.exports = router;
