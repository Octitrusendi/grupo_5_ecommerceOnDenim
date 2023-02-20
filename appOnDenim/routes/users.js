var express = require('express');
var router = express.Router();
const subirArchivo = require('../middleware/multerMiddleware.js');
const validaciones = require('../middleware/validateUsersMiddleware');
const guestMiddelware = require('../middleware/guestMiddelware.js');
const authMiddelware = require('../middleware/authMiddelware.js');

const usersControllers = require('../controllers/usersControllers.js');

/* GET users listing. */

router.get('/login', guestMiddelware, usersControllers.login);
router.post('/login', usersControllers.loginProcess);

router.get('/register', guestMiddelware, usersControllers.register);

router.post(
  '/register',
  subirArchivo.single('avatar'),
  validaciones,
  usersControllers.pocessRegister,
);

router.get('/profile', authMiddelware, usersControllers.profile);

router.get('/edit/:id', authMiddelware, usersControllers.edit);
router.put(
  '/update/:id',
  authMiddelware,
  subirArchivo.single('avatar'),
  usersControllers.update,
);

router.get('/order/:id', authMiddelware, usersControllers.pedido);

router.delete('/:id', usersControllers.borrar);

router.get('/logout', usersControllers.logout);

module.exports = router;
