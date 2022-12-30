const { body } = require('express-validator');
const path = require('path');

const validations = [
  body('fullName')
    .notEmpty()
    .withMessage('Tienes que escribir tu nombre completo'),
  body('usuario')
    .notEmpty()
    .withMessage('Tienes que escribir un nombre de usuario')
    .isAlphanumeric()
    .withMessage('Tu nombre de usuario debe contener sólo letras y/o números'),
  // body('address').notEmpty().withMessage('Tienes que escribir un domicilio'),
  body('email')
    .notEmpty()
    .withMessage('Tienes que escribir un correo electronico')
    .bail()
    .isEmail()
    .withMessage('Debes escribir un formato de correo electronico válido'),
  body('password')
    .notEmpty()
    .withMessage('Tienes que escribir una contraseña')
    .isLength({ min: 6, max: 20 })
    .withMessage('Tu contraseña debe contener 6 caracteres o más '),

];

module.exports = validations;
