var fs = require("fs"),
    path = require("path");

module.exports = {
    setMediaPath: function(mediaPath) {
        this.mediaFilePath = path.resolve(__dirname, mediaPath);
    },

    stream: function(req, res) {
        var file = this.mediaFilePath;
        var range = req.headers.range;
        var positions = range.replace(/bytes=/, "").split("-");
        var start = parseInt(positions[0], 10);

        fs.stat(file, function(err, stats) {
            var total = stats.size;
            var end = positions[1] ? parseInt(positions[1], 10) : total - 1;
            var chunksize = (end - start) + 1;

            res.writeHead(206, {
                "Content-Range": "bytes " + start + "-" + end + "/" + total,
                "Accept-Ranges": "bytes",
                "Content-Length": chunksize,
                "Content-Type": "video/mp4"
            });

            var stream = fs.createReadStream(file, {
                    start: start,
                    end: end
                })
                .on("open", function() {
                    stream.pipe(res);
                })
                .on("error", function(err) {
                    res.end(err);
                });
        });
    }
};