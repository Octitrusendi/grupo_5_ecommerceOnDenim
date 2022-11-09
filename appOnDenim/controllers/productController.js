const fs = require('fs');
const path = require('path');
var createError = require('http-errors');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


const productController = {
  detalle: (req, res, next) => {
    let jean = products.find(jean => jean.id == req.params.jeanID);
    if( jean == undefined){
      next(createError(404));

    }return res.render('productDetail', {jean,products,  title: 'OnDenim | ' }, );
  }
};

module.exports = productController;
