const fs = require('fs');
const path = require('path');
var createError = require('http-errors');
const { where } = require('sequelize');

const productsFilePath = path.join(
  __dirname,
  '../database/productsDataBase.json',
);
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

const db = require('../database/models');
const sequelize = db.sequelize;

const mainController = {
  index: (req, res) => {

    db.Products.findAll({
      limit: 4,
    }).then(products => {
      let succes = req.query.enviado;
      res.render('index', {
        user: req.session.userLogged,
        products: products,
        succes,
        toThousand,
        title: 'OnDenim | Home',
      });
    });
  },
  carrito: (req, res) => {
    res.render('productCart', {
      user: req.session.userLogged,
      toThousand,
      products,
      title: 'OnDenim | Tu carrito',
    });
  },
};

module.exports = mainController;
