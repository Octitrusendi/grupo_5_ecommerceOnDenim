const { body } = require('express-validator');
const path = require('path');


const validations = [
    body('fullName').notEmpty().withMessage('Tienes que escribir tu nombre completo'),
    body('usuario').notEmpty().withMessage('Tienes que escribir un nombre de usuario'),
   // body('address').notEmpty().withMessage('Tienes que escribir un domicilio'),
    body('email').notEmpty().withMessage('Tienes que escribir un correo electronico').bail().isEmail().withMessage('Debes escribir un formato de correo electronico válido'),
    body('password').notEmpty().withMessage('Tienes que escribir una contraseña'),
   // body('profileId').notEmpty().withMessage('Tienes que elegir un perfil'),

]


module.exports = validations;