const db = require('../database/models');

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
};
