var express = require('express');
var router = express.Router();
const productController = require('../controllers/productController.js');
const subirArchivo = require('../middleware/multerMiddleware.js');
const validaciones = require('../middleware/validateProductsMiddleware');
const authMiddelware = require('../middleware/authMiddelware.js');

router.get('/', productController.totalProductos);
router.get('/detalle/:jeanID', productController.detalle);

router.get('/agregar', authMiddelware, productController.agregar);
router.post(
  '/',
  subirArchivo.single('image'),
  validaciones,
  productController.store,
);

router.get('/search', productController.search);

router.get('/editar/:id', authMiddelware, productController.editar);
router.put('/:id', subirArchivo.single('image'), productController.update);

router.delete('/:id', productController.borrar);

module.exports = router;
