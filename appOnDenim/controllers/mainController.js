const fs = require('fs');
const path = require('path');
var createError = require('http-errors');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const mainController = {
  index: (req, res) => {
    res.render('index', { products, title: 'OnDenim | Home' });
  },
  login: (req, res) => {
    res.render('login', { title: 'OnDenim | Login' });
  },
  register: (req, res) => {
    res.render('register', { title: 'OnDenim | Registro' });
  },
  totalProductos: (req, res) =>{
     res.render('totalProductos', { products, title: 'OnDenim | Todos los Jeans' }, );
  },
};

module.exports = mainController;
