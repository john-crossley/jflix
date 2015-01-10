var JSX = require('node-jsx').install(),
    React = require('react'),
    SearchBox = require('./components/SearchBox.react'),
    Media = require('./models/Media'),
    Config = require('./config');

module.exports = {
    index: function(req, res) {

        var markup = React.renderComponentToString(
            SearchBox()
        );

        res.render('home', {
            markup: markup
        });
    },

    list: function(req, res) {

        var drivePath = Config.drivePath;

        // Media.getMedia( function (media) {
        //     res.send(media);
        // });
    }
};