var express = require('express');
var router = express.Router();
const productController = require('../controllers/productController.js');

router.get('/', productController.totalProductos);
router.get('/detalle/:jeanID', productController.detalle);
router.get('/agregar', productController.agregar);
router.get('/editar', productController.editar);

module.exports = router;
