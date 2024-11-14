const express = require('express');
const router = express.Router();
module.exports = router;

// Require controller modules
const api_controller = require('../controllers/api');
const heritageSite_controller = require('../controllers/heritagesite');

/// API ROUTE ///
// GET resources base
router.get('/', api_controller.api);

/// HERITAGE SITE ROUTES ///
// POST request for creating a Heritage Site
router.post('/heritageSites', heritageSite_controller.heritageSite_create_post);

// DELETE request to delete Heritage Site
router.delete('/heritageSites/:id', heritageSite_controller.heritageSite_delete);

// PUT request to update Heritage Site
router.put('/heritageSites/:id', heritageSite_controller.heritageSite_update_put);

// GET request for one Heritage Site
router.get('/heritageSites/:id', heritageSite_controller.heritageSite_detail);

// GET request for list of all Heritage Sites
router.get('/heritageSites', heritageSite_controller.heritageSite_list);

module.exports = router;
