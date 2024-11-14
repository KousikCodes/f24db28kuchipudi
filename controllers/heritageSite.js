const HeritageSite = require('../models/heritageSite');

exports.heritageSite_list = async function (req, res) {
    try {
        const heritageSites = await HeritageSite.find();
        res.send(heritageSites);
    } catch (err) {
        res.status(500);
        res.send({ "error": err.message });
    }
};

// In heritageSite_controller.js (or your controller file)
exports.heritageSite_view_all_Page = async function (req, res) {
    try {
        results = await HeritageSite.find();  // Fetch all heritage sites from the DB
        res.render('heritagesites', { title: 'Heritage Sites', results: results });  // Render the view with results
    } catch (err) {
        res.status(500).send(`{"error": ${err}}`);  // Handle errors and send a response
    }
};



// For a specific Heritage Site
exports.heritageSite_detail = function (req, res) {
    res.send('NOT IMPLEMENTED: HeritageSite detail: ' + req.params.id);
};

// Handle Heritage Site create on POST
exports.heritageSite_create_post = async function (req, res) {
    console.log(req.body)
    let document = new HeritageSite();
    // We are looking for a body, since POST does not have query parameters.
    // Even though bodies can be in many different formats, we will be picky
    // and require that it be a json object
    // {"costume_type":"goat", "cost":12, "size":"large"}
    document.site_name = req.body.site_name;
    document.location = req.body.location;
    document.year_established = req.body.year_established;
    try {
        let result = await document.save();
        res.send(result);
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};


// Handle Heritage Site delete on DELETE
exports.heritageSite_delete = function (req, res) {
    res.send('NOT IMPLEMENTED: HeritageSite delete DELETE ' + req.params.id);
};

// Handle Heritage Site update on PUT
exports.heritageSite_update_put = function (req, res) {
    res.send('NOT IMPLEMENTED: HeritageSite update PUT ' + req.params.id);
};
