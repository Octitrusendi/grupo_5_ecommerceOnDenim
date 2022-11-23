var express = require('express');
const multer = require('multer');
const path = require('path');
var router = express.Router();
const productController = require('../controllers/productController.js');
const MIMETYPES = ['image/jpeg', 'image/jpg', 'image/png'];

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/images/productos');
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname +
        'productos_' +
        Date.now() +
        path.extname(file.originalname),
    );
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 1000000 },
  fileFilter: function (_req, file, cb) {
    let type = file.mimetype.startsWith('image/');
    type ? cb(null, true) : cb(new Error('Solo subir imagenes'));
  },
});

router.get('/', productController.totalProductos);
router.get('/detalle/:jeanID', productController.detalle);

router.get('/agregar', productController.agregar);
router.post('/', upload.single('image'), productController.store);

router.get('/editar/:id', productController.editar);
router.put('/:id', upload.single('image'), productController.update);

module.exports = router;
