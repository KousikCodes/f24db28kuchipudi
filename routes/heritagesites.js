var express = require('express');
var router = express.Router();

/* GET heritage sites page. */
router.get('/', function(req, res, next) {
  res.render('heritagesites', { title: `Search Results - HeritageSites` });
});

module.exports = router;
