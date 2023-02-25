const db = require("../database/models");
const Users = db.User;

userLoggedMiddelware = async (req, res, next) => {
  res.locals.isLogged = false;
  let userFromCookie;

  if (req.session && req.session.userLogged) {
    res.locals.isLogged = true;
    res.locals.userLogged = req.session.userLogged;
    if (req.session.userLogged.id_level === 1) {
      res.locals.userAdmin = true;
    }
  } else {
    if (req.cookies.userId) {
      userFromCookie = await Users.findOne({
        where: { id: req.cookies.userId },
      });
    }

    if (userFromCookie) {
      res.locals.isLogged = true;
      res.locals.userLogged = req.session.userLogged = userFromCookie;
    }
  }

  next();
};

module.exports = userLoggedMiddelware;