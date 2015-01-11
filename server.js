// Require our dependencies
var express = require('express'),
    exphbs = require('express-handlebars'),
    http = require('http'),
    mongoose = require('mongoose'),
    routes = require('./routes'),
    config = require('./config');

// Create an express instance and set a port variable
var app = express();
var port = process.env.PORT || 8080;

// Set handlebars as the template engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Disable etag headers on responses
app.disable('etag');

// Connect to our mongo database
mongoose.connect('mongodb://localhost/jflix');

// Routes
app.get('/', routes.index);
// app.get('/play/:id', routes.play);
app.get('/search/:term', routes.search);

app.get('/list', routes.list);

// Set /public as our static content dir
app.use('/', express.static(__dirname + '/public'));

// Start the server
var server = http.createServer(app).listen(port, function () {
    console.log('Express server listening on port ' + port);
});