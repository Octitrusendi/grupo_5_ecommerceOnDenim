const User = require('../models/User');

function userLoggedMiddelware(req, res, next) {
  res.locals.isLogged = false;

  let emaiInCookie = req.cookies.userEmail;
  let userFromCookie = User.findByfield('email', emaiInCookie);
  if (userFromCookie) {
    req.session.userLogged = userFromCookie;
  }

  if (req.session && req.session.userLogged) {
    res.locals.isLogged = true;
    res.locals.userLogged = req.session.userLogged;
  }

  next();
}

module.exports = userLoggedMiddelware;
