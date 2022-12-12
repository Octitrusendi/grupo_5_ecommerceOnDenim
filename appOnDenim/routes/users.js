var express = require('express');
var router = express.Router();
const subirArchivo = require('../middleware/multerMiddleware.js');
const validaciones = require('../middleware/validateUsersMiddleware');

const usersControllers = require('../controllers/usersControllers.js');

/* GET users listing. */

router.get('/login', usersControllers.login);

router.get('/register', usersControllers.register);

router.post(
  '/register',
  subirArchivo.single('avatar'),
  validaciones,
  usersControllers.pocessRegister,
);

module.exports = router;
