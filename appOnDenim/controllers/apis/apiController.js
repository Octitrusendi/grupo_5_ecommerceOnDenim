const db = require('../../database/models');


const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

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
  users: (req, res) => {
    db.Users.findAll()
      .then(data => {
        res.status(200).json({
          count: data.length,
          data: data.map(user => ({
            id: user.id,
            fullName: user.fullName,
            email: user.email,
            id_level: user.id_level,
            avatar: `localhost:3001/images/avatar/${user.avatar}`,
            detail: `localhost:3001/api/users/${user.id}`,
          })),
        });
      })
      .catch(error => res.status(500).json('ERROR: DB_ERROR' + error));
  },
  cards: async (req, res) => {
    let users = await db.Users.findAll();
    let products = await db.Products.findAll();
    let orders = await db.Order.findAll();

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
        },
        {
          color: 'success',
          name: 'Cantidad de ventas',
          cuantity: orders.length,
          icon: 'fas fa-check',
        },
        {
          name: 'Total Vendio',
          cuantity: `$ ${toThousand(amount)}`,
          icon: 'fas fa-dollar-sign',
        },
        {
          color: 'warning',
          name: 'Total de Usuarios',
          cuantity: users.length,
          icon: 'fas fa-user-check',
        },
      ],
    });
  },
};
