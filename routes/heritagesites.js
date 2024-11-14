const express = require('express');
const router = express.Router();
const heritageSiteController = require('../controllers/heritagesite');

// Route to view all heritage sites in a web page
router.get('/', heritageSiteController.heritageSite_view_all_Page);

// Optional: Route to view a form for creating a new heritage site (if needed)
router.get('/create', (req, res) => res.render('heritagesite_create_form'));

// Export the router
module.exports = router;
