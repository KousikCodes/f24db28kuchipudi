const HeritageSite = require('../models/heritageSite');

// List of all Heritage Sites
exports.heritageSite_list = async function(req, res) {
    try {
        const heritageSites = await HeritageSite.find(); // Fetches all documents in the heritage site collection
        res.send(heritageSites); // Sends the list as JSON
    } catch (err) {
        res.status(500);
        res.send({ "error": err.message }); // Sends an error response if any issues occur
    }
};

// For a specific Heritage Site
exports.heritageSite_detail = function(req, res) {
  res.send('NOT IMPLEMENTED: HeritageSite detail: ' + req.params.id);
};

// Handle Heritage Site create on POST
exports.heritageSite_create_post = function(req, res) {
  res.send('NOT IMPLEMENTED: HeritageSite create POST');
};

// Handle Heritage Site delete on DELETE
exports.heritageSite_delete = function(req, res) {
  res.send('NOT IMPLEMENTED: HeritageSite delete DELETE ' + req.params.id);
};

// Handle Heritage Site update on PUT
exports.heritageSite_update_put = function(req, res) {
  res.send('NOT IMPLEMENTED: HeritageSite update PUT ' + req.params.id);
};
