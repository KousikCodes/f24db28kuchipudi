const express = require('express');
const router = express.Router();

// Require controller modules
const api_controller = require('../controllers/api');
const heritageSiteController = require('../controllers/heritagesite');

// Base API route
router.get('/', api_controller.api);

// API routes for Heritage Site
router.post('/heritageSites', heritageSiteController.heritageSite_create_post);
router.get('/heritageSites', heritageSiteController.heritageSite_list);
router.get('/heritageSites/all', heritageSiteController.heritageSite_view_all_Page);
router.get('/heritageSites/:id', heritageSiteController.heritageSite_detail);
router.put('/heritageSites/:id', heritageSiteController.heritageSite_update_put);
router.delete('/heritageSites/:id', heritageSiteController.heritageSite_delete);

module.exports = router;
