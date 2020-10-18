
const passport = require('passport');

exports.getGoogleAuthCallback = (req, res, next) => {
  res.redirect('/blogs');
}

exports.getCurrUser = (req, res, next) => {
  res.send(req.user);
}

exports.getLogout = (req, res, next) => {
  req.logout();
  res.redirect('/');
}
