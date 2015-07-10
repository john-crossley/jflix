function FileUtility() {
}

FileUtility.prototype.setPath = function(path) {
    this.path = path;
    this.process();
};

FileUtility.prototype.process = function() {
    var path = this.path,
        pathChunks = path.split('/'),
        fileParts = pathChunks[pathChunks.length-1].split('.'),
        filename = fileParts[0];

    this.filename = filename;
    this.slug = this.convertFilenameToSlug();
};

FileUtility.prototype.convertFilenameToSlug = function() {
    var lowerCaseFilename = this.filename.toLowerCase();
    return lowerCaseFilename.replace(/[^\w\s]/g, '').replace(/\s+/g, '-');
};

FileUtility.prototype.getSlug = function() {
    return this.slug;
};

FileUtility.prototype.getFilename = function() {
    return this.filename;
};

module.exports = FileUtility;
