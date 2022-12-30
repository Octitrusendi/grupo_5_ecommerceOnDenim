const createError = require('http-errors');
const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');

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
      user: req.session.userLogged,
      jean,
      products,
      toThousand,
      title: 'OnDenim | ',
    });
  },
  totalProductos: (req, res) => {
    res.render('totalProductos', {
      user: req.session.userLogged,
      products,
      toThousand,
      title: 'OnDenim | Todos los Jeans',
    });
  },
  agregar: (req, res) => {
    let categorias = products.map(categorias => categorias.category);
    let categoriasFill = new Set(categorias);
    res.render('productAdd', {
      user: req.session.userLogged,
      categoriasFill,
      title: 'OnDenim | Agregar Producto',
    });
  },
  store: (req, res) => {
    let errores = validationResult(req);
    let categorias = products.map(categorias => categorias.category);
    let categoriasFill = new Set(categorias);
    if (!errores.isEmpty()) {
      return res.render('productAdd', {
        user: req.session.userLogged,
        mensajesDeError: errores.array(),
        categoriasFill,
        title: 'OnDenim | Agregar Producto',
      });
    } else {
      let image;
      if (req.file != undefined) {
        image = req.file.filename;
      } else {
        image = null;
      }
      let newProduct = {
        id: products[products.length - 1].id + 1,
        ...req.body,
        image,
      };
      products.push(newProduct);
      fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));
      res.redirect('/');
    }
  },
  editar: (req, res) => {
    let id = req.params.id;
    let productoAeditar = products.find(producto => producto.id == id);
    let categorias = products.map(categorias => categorias.category);
    let categoriasFill = new Set(categorias);

    if (productoAeditar != undefined) {
      res.render('productEdit', {
        user: req.session.userLogged,
        productoAeditar,
        categoriasFill,
        toThousand,
        title: 'OnDenim | Modificar Producto',
      });
    } else {
      res.send('error');
    }
  },
  update: (req, res) => {
    let id = req.params.id;
    let productoAeditar = products.find(producto => producto.id == id);
    let image;

    if (req.file != undefined) {
      image = req.file.filename;
    } else {
      image = productoAeditar.image;
    }
    productoAeditar = {
      id: productoAeditar.id,
      ...req.body,
      image: image,
    };
    let nuevoProducto = products.map(product => {
      if (product.id == productoAeditar.id) {
        return (product = { ...productoAeditar });
      }
      return product;
    });
    fs.writeFileSync(
      productsFilePath,
      JSON.stringify(nuevoProducto, null, ' '),
    );
    res.redirect('/productos/detalle/' + id);
  },
  borrar: (req, res) => {
    let id = req.params.id;
    let eliminar = products.filter(producto => producto.id != id);
    fs.writeFileSync(productsFilePath, JSON.stringify(eliminar, null, ''));
    res.redirect('/productos');
  },
  search: (req, res) => {
    let search = req.query.keywords;
    let productsToSearch = products.filter(product =>
      product.name.toLowerCase().includes(search.toLowerCase()),
    );
    console.log(productsToSearch);
    res.render('productResultFind', {
      search,
      user: req.session.userLogged,
      products: productsToSearch,
      toThousand,
      title: 'OnDenim | Tu busqueda: ' + req.query.keywords,
    });
  },
};

module.exports = productController;
