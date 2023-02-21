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
    let productoEncontrado = db.Products.findOne({
      include: ['talle'],
      where: {
        id: req.params.jeanID,
      },
    });

    Promise.all([productoEncontrado, allProducts]).then(
      async ([jean, allProducts]) => {
        let categoriaProducto = await db.ProductCategory.findByPk(
          jean.id_category,
        );
        res.render('productDetail', {
          user: req.session.userLogged,
          jean: jean,
          categoria: categoriaProducto,
          products: allProducts,
          toThousand,
          title: 'OnDenim | ' + jean.name,
        });
      },
    );
  },
  totalProductos: async (req, res) => {
    const pageAsNumber = Number.parseInt(req.query.page);
    const sizeAsNumber = Number.parseInt(req.query.size);

    let page = 0;
    if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
      page = pageAsNumber;
    }

    let size = 2;
    if (
      !Number.isNaN(sizeAsNumber) &&
      !(sizeAsNumber > size) &&
      !(sizeAsNumber < 1)
    ) {
      size = sizeAsNumber;
    }
    let totalProductos = await db.Products.count();
    let products = await db.Products.findAll({
      include: 'talle',
      limit: size,
      offset: page * size,
    });

    res.render('totalProductos', {
      user: req.session.userLogged,
      products,
      totalPages: Math.ceil(totalProductos / Number.parseInt(size)),
      pageAsNumber,
      toThousand,
      title: 'OnDenim | Todos los Jeans',
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

    Promise.all([categoriasFill, promTalles])
      .then(async ([ProductCategory, Talles]) => {
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

          let productoEncontrado = await db.Products.create({
            ...newProduct,
          });

          let tallesElegidos = req.body.talles;

          for (let i = 0; i < tallesElegidos.length; i++) {
            db.ProductTalles.create({
              id_talles: tallesElegidos[i],
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
    /*     let productoAeditar = products.find(producto => producto.id == id);
    let categorias = products.map(categorias => categorias.category);
    let categoriasFill = new Set(categorias); */
    let allProducts = db.Products.findAll();
    let productoEncontrado = db.Products.findOne({
      include: ['talle'],
      where: {
        id: id,
      },
    });
    let promTalles = db.Talles.findAll();
    let allCategorias = db.ProductCategory.findAll();

    Promise.all([
      productoEncontrado,
      allProducts,
      promTalles,
      allCategorias,
    ]).then(
      async ([productoEncontrado, allProducts, promTalles, allCategorias]) => {
        let categoriaProducto = await db.ProductCategory.findByPk(
          productoEncontrado.id_category,
        );

        res.render('productEdit', {
          user: req.session.userLogged,
          productoAeditar: productoEncontrado,
          categoriasFill: categoriaProducto,
          products: allProducts,
          talles: promTalles,
          allCategorias: allCategorias,
          toThousand,
          title: 'OnDenim | Modificar Producto' + productoEncontrado.name,
        });
      },
    );
  },
  update: (req, res) => {
    let id = req.params.id;
    //let productoAeditar = products.find(producto => producto.id == id);

    let productoAeditar = db.Products.findByPk(id);
    let image;

    if (req.file != undefined) {
      image = req.file.filename;
    } else {
      image = productoAeditar.image;
    }

    db.Products.update(
      {
        name: req.body.name,
        description: req.body.description,
        sale: req.body.sale,
        price: req.body.price,
        stock: req.body.stock,
        newCollection: req.body.newCollection,
        image: image,
        id_category: req.body.category,
      },
      {
        where: { id: id },
      },
    )

      .then(() => {
        res.redirect('/productos/detalle/' + id);
      })
      .catch(error => res.send(error));

    /*     productoAeditar = {
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
    ); */
  },
  borrar: async (req, res) => {
    let idProducto = req.params.id;
    // let eliminar = products.filter(producto => producto.id != id);
    // fs.writeFileSync(productsFilePath, JSON.stringify(eliminar, null, ''));
    await db.ProductTalles.destroy({
      where: {
        id_product: idProducto,
      },
      force: true,
    });
    await db.Products.destroy({
      where: {
        id: idProducto,
      },
    });

    res.redirect('/productos');
  },
  search: async (req, res) => {
    let search = req.query.keywords;
    /*     let productsToSearch = products.filter(product =>
      product.name.toLowerCase().includes(search.toLowerCase()),
    ); */
    let productsToSearch = await db.Products.findAll({
      where: {
        name: { [Op.like]: `%${search}%` },
      },
    });
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
