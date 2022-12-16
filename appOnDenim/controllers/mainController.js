const fs = require('fs');
const path = require('path');
var createError = require('http-errors');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

const mainController = {
  index: (req, res) => {
    res.render('index', {
      products,
      toThousand,
      title: 'OnDenim | Home',
    });
  },
  carrito: (req, res) => {
    res.render('productCart', {
      products,
      title: 'OnDenim | Tu carrito',
    });
  },
};

module.exports = mainController;
