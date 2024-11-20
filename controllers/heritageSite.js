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
exports.heritageSite_detail = async function (req, res) {
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
// Handle Heritage Site delete on DELETE
exports.heritageSite_delete = async function(req, res) {
    console.log("Deleting Heritage Site with ID:", req.params.id);
    try {
        const result = await HeritageSite.findByIdAndDelete(req.params.id);
        if (!result) {
            res.status(404).send(`{"error": "Heritage Site document for ID ${req.params.id} not found"}`);
        } else {
            console.log("Removed:", result);
            res.send(`{"message": "Heritage Site document with ID ${req.params.id} deleted successfully"}`);
        }
    } catch (err) {
        console.error("Error deleting document:", err);
        res.status(500).send(`{"error": "Error deleting document for ID ${req.params.id}: ${err.message}"}`);
    }
};



// Handle Heritage Site update form on PUT.
exports.heritageSite_update_put = async function (req, res) {
    console.log(`Updating Heritage Site with ID: ${req.params.id} and data: ${JSON.stringify(req.body)}`);
    try {
        let toUpdate = await HeritageSite.findById(req.params.id);

        // Update fields if they are present in the request body
        if (req.body.site_name) toUpdate.site_name = req.body.site_name;
        if (req.body.location) toUpdate.location = req.body.location;
        if (req.body.year_established) toUpdate.year_established = req.body.year_established;

        // Checkbox example: converting undefined to false if unchecked
        toUpdate.is_famous = req.body.checkbox_famous ? true : false;

        let result = await toUpdate.save();
        console.log("Update successful:", result);
        res.send(result);
    } catch (err) {
        console.error("Error updating document:", err);
        res.status(500).send(`{"error": "Update for ID ${req.params.id} failed: ${err.message}"}`);
    }
};