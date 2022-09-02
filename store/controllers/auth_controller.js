const User = require('../models/user.model');

function getSignup(req, res) {
  res.render('customer/auth/signup');
}

async function signup(req, res) {
  const user = new User(
    req.body.email,
    req.body.password,
    req.body.full_name,
    req.body.street,
    req.body.zip_code,
    req.body.city
  );

 await user.signup();

 res.redirect('/login'); // avoid resubmission of data
}

function getLogin(req, res) {
    res.render('customer/auth/login');
}

module.exports = {
  getSignup: getSignup,
  getLogin: getLogin,
  signup: signup
};
