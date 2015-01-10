var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MediaSchema = new Schema({
    slug: String,
    path: String
});

module.exports = mongoose.model('Media', MediaSchema);