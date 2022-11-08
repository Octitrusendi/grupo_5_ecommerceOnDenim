var express = require('express');
var router = express.Router();
const mainController = require('../controllers/mainController.js');
/* GET home page. */
router.get('/', mainController.index);
router.get('/login', mainController.login);
router.get('/register', mainController.register);


module.exports = router;
