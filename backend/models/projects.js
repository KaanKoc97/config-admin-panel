const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    projectName: { type: String, required: true},
    devices : { type: Array, required: false},
});

module.exports = mongoose.model('project', projectSchema);