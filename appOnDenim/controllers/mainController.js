const mainController = {
  index: (req, res) => {
    res.render('index', { title: 'OnDenim | Home' });
  },
  login: (req, res) => {
    res.render('login', { title: 'OnDenim | Login' });
  },
  register: (req, res) => {
    res.render('register', { title: 'OnDenim | Registro' });
  },
  
};

module.exports = mainController;
