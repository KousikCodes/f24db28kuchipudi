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


exports.heritageSite_view_all_Page = async function (req, res) {
    try {
        results = await HeritageSite.find();  // Fetch all heritage sites from the DB
        res.render('heritagesites', { title: 'Heritage Sites', results: results });  // Render the view with results
    } catch (err) {
        res.status(500).send(`{"error": ${err}}`);  // Handle errors and send a response
    }
};



// For a specific Heritage Site
exports.heritageSite_detail = async function(req, res) {
    console.log("Detail of Heritage Site with ID:", req.params.id);
    try {
        const result = await HeritageSite.findById(req.params.id);
        if (!result) {
            res.status(404).send(`{"error": "Heritage Site document for ID ${req.params.id} not found"}`);
        } else {
            res.send(result);
        }
    } catch (error) {
        res.status(500).send(`{"error": "Error retrieving document for ID ${req.params.id}: ${error.message}"}`);
    }
};


// Handle Heritage Site create on POST
exports.heritageSite_create_post = async function (req, res) {
    console.log(req.body)
    let document = new HeritageSite();
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
