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
  loginProcess: (req, res) => {
    let userToLogin = User.findByfield('email', req.body.email);
    if (!userToLogin) {
      return res.render('login', {
        mensajesDeError: [
          {
            msg: 'No se encuentra este email en nuestra base de datos.',
          },
        ],
        title: 'OnDenim | login',
        oldData: req.body,
      });
    }
    let passwordOk = bcryptjs.compareSync(
      req.body.password,
      userToLogin.password,
    );
    if (!passwordOk) {
      return res.render('login', {
        mensajesDeError: [
          {
            msg: 'La información ingresada no es correcta.',
          },
        ],
        title: 'OnDenim | login',
        oldData: req.body,
      });
    }
    delete userToLogin.password
    req.session.userLogged = userToLogin;
    console.log(req.session)
    return res.redirect('/');
  },
  register: (req, res) => {
    res.render('register', { title: 'OnDenim | Registro' });
  },
  pocessRegister: (req, res) => {
    let errores = validationResult(req);
    console.log(errores.array());
    if (!errores.isEmpty()) {
      return res.render('register', {
        mensajesDeError: errores.array(),
        title: 'OnDenim | Registro',
        oldData: req.body,
      });
    } else {
      let userInDB = User.findByfield('email', req.body.email);
      if (userInDB) {
        return res.render('register', {
          mensajesDeError: [
            {
              msg: 'Este email ya está registrado',
            },
          ],
          title: 'OnDenim | Registro',
          oldData: req.body,
        });
      }
      let userToCreate = {
        ...req.body,
        password: bcryptjs.hashSync(req.body.password, 10),
        avatar: req.file.filename,
      };
      User.create(userToCreate);
      res.redirect('/user/login');
    }
  },
};

module.exports = usersControllers;
