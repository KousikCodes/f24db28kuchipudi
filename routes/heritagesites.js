var express = require('express');
var router = express.Router();
const heritageSiteController = require('../controllers/heritageSite');  
router.get('/', heritageSiteController.heritageSite_view_all_Page);
router.post('/', heritageSiteController.heritageSite_create_post);
// Export the router
module.exports = router;