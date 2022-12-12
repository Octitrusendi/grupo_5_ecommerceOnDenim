const createError = require('http-errors');
const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');
const User = require('../models/User');

const usersFilePath = path.join(__dirname, '../data/user.json');
const usuarios = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const usersControllers = {
  login: (req, res) => {
    res.render('login', { title: 'OnDenim | Login' });
  },
  register: (req, res) => {
    res.render('register', { title: 'OnDenim | Registro' });
  },
  pocessRegister: (req, res) => {
    let errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.render('register', {
        mensajesDeError: errores.array(),
        title: 'OnDenim | Registro',
      });
    } else {
      let userInDB = User.findByfield('email', req.body.email);
      if (userInDB) {
        return res.render('register', {
          mensajesDeError: {
            email: {
              msg: 'Este email ya está registrado',
            },
          },
          title: 'OnDenim | Registro',
        });
      }
      let userToCreate = {
        ...req.body,
        password: bcryptjs.hashSync(req.body.password, 10),
        avatar: req.file.filename,
      };
      User.create(userToCreate);
      res.redirect('/');
    }
  },
};

module.exports = usersControllers;
