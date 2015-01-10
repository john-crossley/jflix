var mongoose = require('mongoose');

// Create a new schema for our Media data
var schema = new mongoose.Schema({
    slug: String,
    path: String
});

// Create a static getMedia method to return media data from db
schema.statics.getMedia = function(callback) {
    var media = [];

    Media.find({}, function (err, docs) {
        if (! err) {
            media = docs;
        }
    });

    // Pass them back to the specified callback
    callback(media);
};

module.exports = Media = mongoose.model('Media', schema);