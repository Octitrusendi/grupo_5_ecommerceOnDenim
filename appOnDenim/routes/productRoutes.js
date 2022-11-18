var express = require('express');
var router = express.Router();
const productController = require('../controllers/productController.js');

router.get('/:jeanID', productController.detalle);
router.get('/productos', productController.totalProductos);
router.get('/agregar', productController.agregar);
router.get('/editar', productController.editar);

module.exports = router;
