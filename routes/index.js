var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var passport = require('passport');
var Account = require('../models/account');

// Register
router.get('/register', (req, res) => {
  res.render('register', { title: 'Register' });
});

router.post('/register', (req, res) => {
  Account.register(new Account({ username: req.body.username }), req.body.password, (err) => {
    if (err) {
      return res.render('register', { title: 'Register', error: err.message });
    }
    res.redirect('/login');
  });
});

// Login
router.get('/login', (req, res) => {
  res.render('login', { title: 'Login' });
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/heritageSites',
  failureRedirect: '/login',
  failureFlash: true
}));

// Logout
router.get('/logout', (req, res) => {
  req.logout(err => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

module.exports = router;