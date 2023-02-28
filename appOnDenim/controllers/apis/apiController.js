const db = require('../../database/models');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

module.exports = {
  product: async function (req, res) {
    let product = await db.Products.findByPk(req.params.id, {
      include: 'talle',
    });
    return res.json(product);
  },
  checkout: async function (req, res) {
    // return res.send({ ...req.body, userId: req.session.userLogged.id });
    let order = await db.Order.create(
      { ...req.body, userId: req.session.userLogged.id },
      {
        include: db.Order.OrderItems,
      },
    );
    res.json({ ok: true, status: 200, order: order });
  },
  contact: async function (req, res) {
    let contact = await db.Contact.create({ ...req.body });

    res.json({ ok: true, status: 200, contact: contact });
  },
  users: async (req, res) => {
    let users = await db.Users.findAll({
      include: ['order'],
      order: [['id', 'DESC']],
    });

    let data = await users.map(user => ({
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      id_level: user.id_level,
      avatar: `http://localhost:3001/images/avatar/${user.avatar}`,
      detail: `http://localhost:3001/api/users/${user.id}`,
      totalCompras: user.order.length,
      order: user.order.reduce(
        (contador, ventas) => contador + Number(ventas.total),
        0,
      ),
    }));

    return res.status(200).json({
      count: users.length,
      data: data,
    });
  },

  cards: async (req, res) => {
    let users = await db.Users.findAll();
    let products = await db.Products.findAll();
    let orders = await db.Order.findAll();
    let categorias = await db.ProductCategory.findAll();
    let contactos = await db.Contact.findAll();

    let amount = 0;
    orders.map(vendido => {
      amount += Number(vendido.total);
    });
    res.json({
      meta: {
        status: 200,
        count: users.length,
      },
      data: [
        {
          name: 'Total de productos',
          cuantity: products.length,
          icon: 'fas fa-clipboard-list',
          acceso: 'AllProducts',
        },
        {
          color: 'success',
          name: 'Cantidad de ventas',
          cuantity: orders.length,
          icon: 'fas fa-check',
          acceso: 'AllSales',
        },
        {
          name: 'Total Vendio',
          cuantity: `$ ${toThousand(amount)}`,
          icon: 'fas fa-dollar-sign',
          acceso: 'AllSales',
        },
        {
          color: 'warning',
          name: 'Total de Usuarios',
          cuantity: users.length,
          icon: 'fas fa-user-check',
          acceso: 'AllUsers',
        },
        {
          color: 'warning',
          name: 'Total de Categorias',
          cuantity: categorias.length,
          icon: 'fas fa-bookmark',
          acceso: 'Categories',
        },
        {
          color: 'warning',
          name: 'Total de solicitudes de contacto',
          cuantity: contactos.length,
          icon: 'fas fa-id-card',
          acceso: 'Contact',
        },
      ],
    });
  },
  lastProduct: async (req, res) => {
    const product = await db.Products.findOne({
      order: [['id', 'DESC']],
    });
    let finalPrice = product.price - (product.price * product.sale) / 100;
    res.json({
      meta: {
        status: 200,
        link: '/api/lastproduct',
      },
      data: {
        id: product.id,
        name: product.name,
        image: `http://localhost:3001/images/productos/${product.image}`,
        description: product.description,
        price: toThousand(product.price),
        sale: product.sale,
        newCollection: product.newCollection,
        stock: product.stock,
        finalPrice: toThousand(finalPrice),
      },
    });
  },
  allProducts: async (req, res) => {
    let allProducts = db.Products.findAll({
      include: ['talle', 'categoria', 'orderItems'],
      order: [['id', 'ASC']],
    });

    Promise.all([allProducts]).then(async ([jean]) => {
      res.json({
        meta: {
          status: 200,
          cuantity: jean.length,
          link: '/api/allProducts',
        },
        data: jean.map(jean => {
          return {
            id: jean.id,
            name: jean.name,
            description: jean.description,
            price: jean.price,
            sale: jean.sale,
            talle: jean.talle,
            stock: jean.stock,
            categoria: jean.categoria.name,
            newCollection: jean.newCollection,
            order: jean.orderItems.reduce(
              (contador, ventas) => contador + ventas.quantity,
              0,
            ),
            montoVendido: jean.orderItems.reduce(
              (contador, ventas) => contador + Number(ventas.price),
              0,
            ),
          };
        }),
      });
    });
  },
  categories: async (req, res) => {
    const categories = await db.ProductCategory.findAll({
      include: ['productos'],
    });

    res.json({
      meta: {
        status: 200,
        totalItems: categories.length,
        link: '/api/categories',
      },
      data: categories.map(category => {
        return {
          id: category.id,
          name: category.name,
          productsCount: category.productos.length,
        };
      }),
    });
  },
  destroy: async (req, res) => {
    let idProducto = req.params.id;
    console.log(idProducto);
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
    res.json({
      meta: {
        status: 200,
        msg: 'Producto Borrado con éxito',
      },
    });
  },
  allSales: async (req, res) => {
    const compras = await db.Order.findAll({
      include: ['orderItems', 'user'],
      order: [['createdAt', 'DESC']],
    });

    res.json({
      meta: {
        status: 200,
        totalVentas: compras.length,
        link: '/api/allSales',
      },
      data: {
        compras,
      },
    });
  },
  masVendido: async (req, res) => {
    const masVendido = await db.Products.findOne({
      include: ['talle', 'categoria', 'orderItems'],
      order: [['orderItems', 'quantity', 'DESC']],
      offset: 1,
      limit: 1,
    });
    const finalPrice =
      masVendido.price - (masVendido.price * masVendido.sale) / 100;
    res.json({
      meta: {
        status: 200,
        link: '/api/lastproduct',
      },
      data: {
        id: masVendido.id,
        name: masVendido.name,
        image: `http://localhost:3001/images/productos/${masVendido.image}`,
        description: masVendido.description,
        price: toThousand(masVendido.price),
        sale: masVendido.sale,
        newCollection: masVendido.newCollection,
        stock: masVendido.stock,
        finalPrice: toThousand(finalPrice),
      },
    });
  },
  contact: async (req, res) => {
    const contacto = await db.Contact.findAll();

    res.json({
      meta: {
        status: 200,
        totalContactos: contacto.length,
        link: '/api/contacto',
      },
      data: {
        contacto,
      },
    });
  },
  isAdmin: async (req, res) => {
    await db.Users.update(
      {
        id_level: 1,
      },
      {
        where: { id: req.params.id },
      },
    );

    res.json({
      meta: {
        status: 200,
        link: '/api/isAdmin',
      },
      data: 'Usuario Editado',
    });
  },
};
