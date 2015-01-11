var JSX = require('node-jsx').install(),
    React = require('react'),
    SearchBox = require('./components/SearchBox.react'),
    Media = require('./models/Media'),
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

    search: function(req, res) {
        var searchTerm = req.params.term;

        var data = [{
            path: "/Somepath/to/video",
            slug: "some-slug-name"
        }];

        res.status(200).json(data);
    },

    list: function(req, res) {

        var drivePath = Config.drivePath;

        recursive(drivePath, ['.*'], function(err, files) {

        });

        res.status(200).json({
            data: drivePath
        });

        // Media.getMedia( function (media) {
        //     res.send(media);
        // });
    }
};