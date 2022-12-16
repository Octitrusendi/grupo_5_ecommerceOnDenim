const { body } = require('express-validator');
const path = require('path');


const validations = [
    body('name').notEmpty().withMessage('Tienes que escribir el nombre del articulo'),

]


module.exports = validations;