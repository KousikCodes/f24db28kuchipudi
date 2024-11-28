const mongoose = require('mongoose');

const HeritageSiteSchema = new mongoose.Schema({
    site_name: {
        type: String,
        required: [true, 'Site name is required'],
    },
    location: {
        type: String,
        required: [true, 'Location is required'],
    },
    year_established: {
        type: Number,
        required: [true, 'Year established is required'],
        min: [-3500, 'Year must be after 3500BC'],
        max: [2024, 'Year cannot be in the future'],
    },
});

module.exports = mongoose.model('HeritageSite', HeritageSiteSchema);