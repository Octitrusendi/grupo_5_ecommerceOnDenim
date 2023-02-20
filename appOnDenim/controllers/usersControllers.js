const createError = require('http-errors');
const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');
const User = require('../models/User');
const { use } = require('../routes/productRoutes');
const { where } = require('sequelize');

const usersFilePath = path.join(__dirname, '../database/user.json');
const usuarios = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const db = require('../database/models');
const { response } = require('express');
const sequelize = db.sequelize;

const usersControllers = {
  login: (req, res) => {
    res.render('UserLogin', { title: 'OnDenim | Login' });
  },
  loginProcess: (req, res) => {
    //let userToLogin = User.findByfield('email', req.body.email);
    db.Users.findOne({
      where: { email: req.body.email },
    })
      .then(response => {
        let userToLogin = response;
        if (!userToLogin) {
          return res.render('UserLogin', {
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
          return res.render('UserLogin', {
            mensajesDeError: [
              {
                msg: 'La información ingresada no es correcta.',
              },
            ],
            title: 'OnDenim | login',
            oldData: req.body,
          });
        }
        delete userToLogin.password;
        req.session.userLogged = userToLogin;
        if (req.body.rememberUser) {
          res.cookie('userEmail', req.body.email, { maxAge: 60 * 60 * 24 * 7 });
        }
        return res.redirect('/user/profile');
      })
      .catch(error => error);
  },
  register: (req, res) => {
    res.render('UserRegister', { title: 'OnDenim | Registro' });
  },
  pocessRegister: async (req, res) => {
    let errores = validationResult(req);
    //let emailInDB = User.findByfield('email', req.body.email);
    //let userInDB = User.findByfield('usuario', req.body.usuario);
    let emailInDB = await db.Users.findOne({
      where: { email: req.body.email },
    });
    let userInDB = await db.Users.findOne({
      where: { usuario: req.body.usuario },
    });
    if (!errores.isEmpty()) {
      return res.render('UserRegister', {
        mensajesDeError: errores.array(),
        title: 'OnDenim | Registro',
        oldData: req.body,
      });
    } else if (userInDB || emailInDB) {
      if (userInDB) {
        return res.render('UserRegister', {
          mensajesDeError: [
            {
              msg: 'Este usuario ya existe',
            },
          ],
          title: 'OnDenim | Registro',
          oldData: req.body,
        });
      } else
        return res.render('UserRegister', {
          mensajesDeError: [
            {
              msg: 'Este email ya está registrado',
            },
          ],
          title: 'OnDenim | Registro',
          oldData: req.body,
        });
    } else if (req.body.password !== req.body.password2) {
      return res.render('UserRegister', {
        mensajesDeError: [
          {
            msg: 'Las contraseñas no coinciden',
          },
        ],
        title: 'OnDenim | Registro',
        oldData: req.body,
      });
    }

    let avatar;

    if (req.file != undefined) {
      avatar = req.file.filename;
    } else {
      avatar = 'default-image.png';
    }
    delete req.body.password2;
    let datosUser = {
      usuario: req.body.usuario,
      fullName: req.body.fullName,
      email: req.body.email,
      avatar: avatar,
      password: bcryptjs.hashSync(req.body.password, 10),
    };

    let userToCreate = await db.Users.create(datosUser);
    req.session.userLogged = userToCreate;
    /*let userToCreate = {
      ...req.body,
      password: bcryptjs.hashSync(req.body.password, 10),
      avatar,
    };
    
    User.create(userToCreate);
    */

    /*       let newUserSession = User.findByfield('email', userToCreate.email);
      delete newUserSession.password
      req.session.userLogged = newUserSession;

    res.redirect('/user/profile'); */
    res.redirect('/user/login');
  },
  profile: async (req, res) => {
    let orders = await db.Order.findAll({
      where: { userId: req.session.userLogged.id },
    });
    res.render('userProfile', {
      user: req.session.userLogged,
      orders,
      title: 'OnDenim | Perfil de ' + req.session.userLogged.fullName,
    });
  },
  edit: async (req, res) => {
    let idUser = req.params.id;
    //let findUser = User.findByPk(idUser);
    let findUser = await db.Users.findOne({
      where: { id: idUser },
    });
    res.render('userEdit', {
      user: findUser,
      title: 'OnDenim | Perfil de ' + findUser.fullName,
    });
  },
  update: async (req, res) => {
    let idUser = req.params.id;
    //let userToEdit = User.findByPk(idUser);
    let userToEdit = await db.Users.findOne({
      where: { id: idUser },
    });
    let avatar;
    if (req.file != undefined) {
      avatar = req.file.filename;
    } else {
      avatar = userToEdit.avatar;
    }

    let passwordOk = bcryptjs.compareSync(
      req.body.passwordOld,
      userToEdit.password,
    );

    if (
      req.body.check == undefined &&
      req.body.fullName == userToEdit.fullName &&
      req.body.email == userToEdit.email &&
      req.file == undefined
    ) {
      return res.render('userProfile', {
        mensajeExitoso: [
          {
            msg: '¡Su perfil no tuvo modificaciones!',
          },
        ],
        user: userToEdit,
        title: 'OnDenim | Perfil de ' + userToEdit.fullName,
      });
    }
    if (req.body.check == '1') {
      if (!passwordOk) {
        return res.render('userEdit', {
          mensajesDeError: [
            {
              msg: 'Su contraseña actual no coincide',
            },
          ],
          user: userToEdit,
          title: 'OnDenim | Perfil de ',
          oldData: req.body,
        });
      } else if (req.body.password !== req.body.password2) {
        return res.render('userEdit', {
          mensajesDeError: [
            {
              msg: 'Las contraseñas no coinciden',
            },
          ],
          user: userToEdit,
          title: 'OnDenim | Perfil de ',
          oldData: req.body,
        });
      } else {
        delete req.body.passwordOld;
        delete req.body.check;
        delete req.body.password2;
        await db.Users.update(
          {
            usuario: req.body.usuario,
            fullName: req.body.fullName,
            email: req.body.email,
            avatar: avatar,
            password: bcryptjs.hashSync(req.body.password, 10),
          },
          {
            where: { id: req.params.id },
          },
        );
      }
    } else {
      delete req.body.passwordOld;
      delete req.body.check;
      delete req.body.password2;
      await db.Users.update(
        {
          usuario: req.body.usuario,
          fullName: req.body.fullName,
          email: req.body.email,
          avatar: avatar,
          password: userToEdit.password,
        },
        {
          where: { id: req.params.id },
        },
      );
    }

    /*let nuevoUsuario = usuarios.map(user => {
      if (user.id == userToEdit.id) {
        user = { ...userToEdit };
      }
      return user;
    });*/

    //fs.writeFileSync(usersFilePath, JSON.stringify(nuevoUsuario, null, ' '));
    return res.render('userProfile', {
      mensajeExitoso: [
        {
          msg: '¡Perfil modificado con éxito!',
        },
      ],
      user: userToEdit,
      title: 'OnDenim | Perfil de ' + userToEdit.fullName,
    });
  },
  borrar: async (req, res) => {
    let idUser = req.params.id;
    await db.Users.destroy({
      where: {
        id: idUser,
      },
    });
    // User.delete(idUser);
    req.session.destroy();
    return res.redirect('/user/login');
  },
  logout: (req, res) => {
    res.clearCookie('userEmail');
    req.session.destroy();
    return res.redirect('/');
  },
  pedido: async function (req, res) {
    let order = await db.Order.findByPk(req.params.id, {
      include: db.Order.OrderItems,
    });
    // res.send(order);
    return res.render('ordenes', {
      user: req.session.userLogged,
      order,
      title: 'OnDenim | ',
    });
  },
};

module.exports = usersControllers;
