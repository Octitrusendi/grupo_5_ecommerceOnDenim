const createError = require('http-errors');
const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

const productController = {
  detalle: (req, res, next) => {
    let jean = products.find(jean => jean.id == req.params.jeanID);
    if (jean == undefined) {
      next(createError(404));
    }
    return res.render('productDetail', {
      jean,
      products,
      toThousand,
      title: 'OnDenim | ',
    });
  },
  totalProductos: (req, res) => {
    res.render('totalProductos', {
      products,
      toThousand,
      title: 'OnDenim | Todos los Jeans',
    });
  },
  agregar: (req, res) => {
    let categorias = products.map(categorias => categorias.category);
    let categoriasFill = new Set(categorias);
    res.render('productAdd', {
      categoriasFill,
      title: 'OnDenim | Agregar Producto',
    });
  },
  store: (req, res) => {

    let newProduct = {
      id: products[products.length - 1].id + 1,
      ...req.body,
      image: null,
    };
    products.push(newProduct);
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));
    res.redirect('/');
  },
  editar: (req, res) => {
    res.render('productEdit', {
      products,
      title: 'OnDenim | Modificar Producto',
    });
  },
};

module.exports = productController;
