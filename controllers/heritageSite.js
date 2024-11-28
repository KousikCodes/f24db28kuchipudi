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

// Handle building the view for deleting a heritage site.
// Query provides the ID
// Render the delete view for a heritage site
exports.heritageSite_delete_Page = async function (req, res) {
    try {
        // Find the heritage site by ID
        const site = await HeritageSite.findById(req.query.id);

        if (!site) {
            return res.status(404).json({ error: `Heritage site with ID ${req.query.id} not found` });
        }

        // Render the delete page with the heritage site data
        res.status(200).render('heritagesitedelete', { title: 'Heritage Site Delete', toShow: site });
    } catch (err) {
        // Handle errors, send a 500 error response if there is an issue
        console.error(err);
        res.status(500).json({ error: `Error fetching heritage site: ${err.message}` });
    }
};

// Handle the deletion of a heritage site
exports.heritageSite_delete = async function (req, res) {
    try {
        // Delete the heritage site by ID
        const result = await HeritageSite.findByIdAndDelete(req.params.id);

        if (!result) {
            return res.status(404).json({ error: `Heritage site with ID ${req.params.id} not found` });
        }

        // Send a success message if the deletion is successful
        res.status(200).json({ message: `Heritage site with ID ${req.params.id} deleted successfully` });
    } catch (err) {
        // Handle errors during deletion
        console.error("Error deleting site:", err);
        res.status(500).json({ error: `Error deleting heritage site: ${err.message}` });
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

exports.heritageSite_update_post = async function(req, res) {
    try {
        // Try updating the heritage site
        const updatedSite = await HeritageSite.findByIdAndUpdate(req.body.id, req.body, { new: true, runValidators: true });

        if (!updatedSite) {
            return res.status(404).json({ error: 'Heritage site not found' });
        }

        // Return a success message if the update is successful
        res.status(200).json({ message: 'Update succeeded', updatedSite });
    } catch (err) {
        // Check if the error is a validation error
        if (err.name === 'ValidationError') {
            // Send back the validation error details to the client
            return res.status(400).json({ error: `Validation failed: ${err.message}` });
        }

        // Handle other types of errors
        res.status(500).json({ error: `Internal server error: ${err.message}` });
    }
};



// Handle displaying one Heritage Site by ID
exports.heritageSite_view_one_Page = async function (req, res) {
    console.log("Single view for ID:", req.query.id);
    try {
        const result = await HeritageSite.findById(req.query.id);
        if (!result) {
            res.status(404).send(`{"error": "Heritage Site with ID ${req.query.id} not found"}`);
        } else {
            res.render('heritagesiteDetail', {
                title: 'Heritage Site Detail',
                toShow: result
            });
        }
    } catch (err) {
        res.status(500).send(`{'error': '${err}'}`);
    }
};

// Handle building the view for creating a heritage site
exports.heritageSite_create_Page = function (req, res) {
    console.log("create view");
    try {
        res.render('heritagesitecreate', { title: 'Heritage Site Create' });
    } catch (err) {
        res.status(500);
        res.send(`{'error': '${err}'}`);
    }
};

// Handle building the view for updating a heritage site.
// Query provides the id.
exports.heritageSite_update_Page = async function(req, res) {
    console.log("Update view for heritage site with ID " + req.query.id);
    try {
        let result = await HeritageSite.findById(req.query.id);
        res.render('heritagesiteupdate', { title: 'Heritage Site Update', toShow: result });
    } catch (err) {
        if (err.name === 'ValidationError') {
            // If it's a validation error, render the page with the error message
            res.render('heritagesiteupdate', {
                title: 'Heritage Site Update',
                message: `Error: ${err.message}`,
                toShow: req.body // Preserve any previously entered data in the form
            });
        } else {
            // Handle other types of errors
            res.status(500).send(`{"error": "${err}"}`);
        }
    }
};
