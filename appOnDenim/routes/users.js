var express = require('express');
var router = express.Router();
const subirArchivo = require('../middleware/multerMiddleware.js');
const validaciones = require('../middleware/validateUsersMiddleware');
const guestMiddelware = require('../middleware/guestMiddelware.js')

const usersControllers = require('../controllers/usersControllers.js');

/* GET users listing. */

router.get('/login',guestMiddelware, usersControllers.login);
router.post('/login', usersControllers.loginProcess);

router.get('/register', guestMiddelware,  usersControllers.register);

router.post(
  '/register',
  subirArchivo.single('avatar'),
  validaciones,
  usersControllers.pocessRegister,
);

module.exports = router;
