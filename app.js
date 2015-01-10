var express = require('express');
var app = express();
var path = require('path');

var recursive = require('recursive-readdir');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/jflix');

var Media = require('./models/media');

var JFlixStreamer = require('./jflixstreamer');

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
    res.render('index', {
        title: "Home"
    });
});

app.get('/play/:id', function (req, res) {
    var id = req.params.id;
    Media.find({
        _id: id
    }, function(err, mediaAssetItem) {
       res.render('index', {
            title: "Home",
            slug: mediaAssetItem[0].slug
        });
    });
});

app.get('/search/:title', function (req, res) {
    var regex = new RegExp(req.params.title, "i")
    ,   query = { path: regex };

    Media.find(query, function(err, products) {
        if (err) {
            res.json(err);
        }

        res.json(products);
    });

});

app.get('/purge-and-init', function(req, res) {

    Media.remove({}, function(err) {
        console.log("Media collection removed.");

        recursive('/Volumes/HULK/TV Shows', ['.*'], function(err, files) {

            var data = files.map(function(file) {
                var mediaSlug = file.match(/\/Volumes\/HULK\/(?:Movies|TV\s?Shows)\/([\w\s]+)\/([\w\s]+)\/([\w\s-_]+)/);

                if (typeof mediaSlug !== "undefined") {

                    if (typeof mediaSlug !== null && Array.isArray(mediaSlug)) {
                        var mediaSlug = mediaSlug[3].toLowerCase();
                            mediaSlug = mediaSlug.replace(/-\s/g, '')
                                .replace(/ /g, '-');

                        var media = new Media();
                        media.slug = mediaSlug;
                        media.path = file;

                        media.save( function(err) {
                            if (err) res.send(err);
                            console.log(media.slug);
                        });

                        return media;
                    }
                }
            });

            res.json({data: data});

        });

    });

});

app.get('/stream/:slug', function(req, res) {
    var slug = req.params.slug;
    Media.find({
        slug: slug
    }, function(err, mediaAssetItem) {
        JFlixStreamer.setMediaPath(mediaAssetItem[0].path);
        JFlixStreamer.stream(req, res);
    });
});

app.get('/find/:id', function(req, res) {
    var id = req.params.id;
    Media.find({
        _id: id
    }, function(error, mediaAssetItem) {
        res.json(200, {
            media: mediaAssetItem
        });
    });
});

app.listen(3000);