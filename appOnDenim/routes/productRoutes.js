var express = require('express');
var router = express.Router();
const productController = require('../controllers/productController.js');
const subirArchivo = require('../middleware/multerMiddleware.js');
const validaciones = require('../middleware/validateProductsMiddleware');

router.get('/', productController.totalProductos);
router.get('/detalle/:jeanID', productController.detalle);

router.get('/agregar', productController.agregar);
router.post(
  '/',
  subirArchivo.single('image'),
  validaciones,
  productController.store,
);

router.get('/editar/:id', productController.editar);
router.put('/:id', subirArchivo.single('image'), productController.update);

router.delete('/:id', productController.borrar);

module.exports = router;
