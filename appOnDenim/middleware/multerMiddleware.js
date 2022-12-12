const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if(file.fieldname == 'avatar'){
      cb(null, './public/images/avatar');
    }else{
      cb(null, './public/images/productos');
    }

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


module.exports = upload;
