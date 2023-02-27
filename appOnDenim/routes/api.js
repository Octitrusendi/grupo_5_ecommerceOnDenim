const express = require('express');
const router = express.Router();

const controller = require('../controllers/apis/apiController');
const authMiddelware = require('../middleware/authMiddelware.js');

router.get('/products/:id', controller.product);
router.post('/checkout', controller.checkout);
router.post('/contact', controller.contact);
router.get('/users', controller.users);
router.get('/cards', controller.cards);
router.get('/allProducts', controller.allProducts);
router.get('/lastProduct', controller.lastProduct);
router.get('/categories', controller.categories);
router.delete('/producto/delete/:id', controller.destroy);
router.get('/allSales', controller.allSales);

module.exports = router;
