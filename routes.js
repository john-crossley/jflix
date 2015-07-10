var JSX = require('node-jsx').install(),
    React = require('react'),
    SearchBox = require('./components/SearchBox.react'),
    Media = require('./models/Media'),
    FileUtility = require('./lib/file-utility'),
    Config = require('./config'),
    recursive = require('recursive-readdir');

module.exports = {
    index: function(req, res) {

        var markup = React.renderComponentToString(
            SearchBox()
        );

        res.render('home', {
            markup: markup
        });
    },

    play: function(req, res) {
        res.render('play', {
            video: req.params.id
        });
    },

    stream: function(req, res) {
        Media.find({_id: req.params.id}, function(err, media) {
            Streamer.setMediaPath(media[0].path);
            Streamer.stream(req, res);
        });
    },

    search: function(req, res) {
        var regex = new RegExp(req.params.term, 'i');

        Media.find({path: regex}, function(err, documents) {
            if (err) {
                res.status(500).json({
                    error: true,
                    message: err.toString()
                });
            }
            res.status(200).json(documents);
        });
    },

    list: function(req, res) {
        recursive(Config.drivePath, ['.*'], function(err, files) {
            var data = [];

            files.map(function(file) {
                data.push(files);
            });

            res.status(200).json({
                data: data
            });
        });
    },

    pureAndInitialise: function(req, res) {
        Media.remove({}, function(err) {
            if (err) {
                res.status(500).json({
                    error: true,
                    message: err.toString()
                });
            }
            console.log("All media has been removed...");

            recursive(Config.drivePath, ['.*'], function(err, files) {

                if (err) {
                    res.status(500).json({
                        error: true,
                        message: 'Something went wrong.. Check media path: ' + Config.drivePath
                    });
                }

                var fileUtility = new FileUtility();

                var data = files.map(function(file) {

                    fileUtility.setPath(file);

                    var media = new Media();
                    media.slug = fileUtility.getSlug();
                    media.path = file;
                    media.filename = fileUtility.getFilename();

                    media.save(function(err) {
                        if (err) {
                            res.status(500).json({
                                error: true,
                                message: err.toString()
                            });
                        }
                        console.log('Saved: ' + media.slug);
                    });

                    return media;
                });

                res.status(201).json({
                    error: false,
                    message: data
                });

            });
        });
    }
};
