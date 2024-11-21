const express = require('express');
const router = express.Router();
const heritageSiteController = require('../controllers/heritagesite');

// Route to view all heritage sites in a web page
router.get('/', heritageSiteController.heritageSite_view_all_Page);

router.get('/create', (req, res) => res.render('heritagesite_create_form'));
/* GET delete heritage site page */
router.get('/delete', heritageSiteController.heritageSite_delete_Page);

// Export the router
module.exports = router;
