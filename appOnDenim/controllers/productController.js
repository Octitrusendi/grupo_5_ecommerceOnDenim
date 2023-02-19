const createError = require('http-errors');
const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');

//const productsFilePath = path.join(__dirname, '../database/productsDataBase.json');
//const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require('sequelize');
const ProductCategory = require('../database/models/ProductCategory');

const productController = {
  detalle: (req, res, next) => {
    //let jean = products.find(jean => jean.id == req.params.jeanID);
    let allProducts = db.Products.findAll();
    db.Products.findOne({
      include: ['talle', 'categoria'],
      where: {
        id: req.params.jeanID,
      },
    }).then(jean => {
      res.render('productDetail', {
        user: req.session.userLogged,
        jean,
        products: allProducts,
        toThousand,
        title: 'OnDenim | ' + jean.name,
      });
    });
  },
  totalProductos: (req, res) => {
    db.Products.findAll({
      include: 'talle',
    }).then(products => {
      res.render('totalProductos', {
        user: req.session.userLogged,
        products,
        toThousand,
        title: 'OnDenim | Todos los Jeans',
      });
    });
  },
  agregar: (req, res) => {
    /*     let categorias = products.map(categorias => categorias.category);
    let categoriasFill = new Set(categorias); */
    let promTalles = db.Talles.findAll();
    let categoriasFill = db.ProductCategory.findAll();

    Promise.all([categoriasFill, promTalles]).then(
      ([ProductCategory, Talles]) => {
        res.render('productAdd', {
          user: req.session.userLogged,
          talles: Talles,
          categoriasFill: ProductCategory,
          title: 'OnDenim | Agregar Producto',
        });
      },
    );
  },
  store: (req, res) => {
    let errores = validationResult(req);

    /*     let categorias = products.map(categorias => categorias.category);
    let categoriasFill = new Set(categorias); */

    let promTalles = db.Talles.findAll();
    let categoriasFill = db.ProductCategory.findAll();
    let productoEncontrado = db.Products.findOne({
      where: {
        name: req.body.name,
      },
    });

    Promise.all([categoriasFill, promTalles, productoEncontrado])
      .then(([ProductCategory, Talles, productoEncontrado]) => {
        if (!errores.isEmpty()) {
          return res.render('productAdd', {
            mensajesDeError: errores.array(),
            user: req.session.userLogged,
            talles: Talles,
            categoriasFill: ProductCategory,
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
            name: req.body.name,
            description: req.body.description,
            sale: req.body.sale,
            price: req.body.price,
            stock: req.body.stock,
            newCollection: req.body.newCollection,
            image: image,
            id_category: req.body.category,
          };

          db.Products.create({
            ...newProduct,
          });

          let tallesElegidos = req.body.talles;
          for (let i = 0; i < tallesElegidos.length; i++) {
            console.log('ENNTRE AL FORRR' + i);

            db.ProductTalles.create({
              id_talles: i,
              id_product: productoEncontrado.id,
            });
          }

          res.redirect('/');
        }
      })
      .catch(error => res.send(error));

    /*     if (!errores.isEmpty()) {
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
   
    } */
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
