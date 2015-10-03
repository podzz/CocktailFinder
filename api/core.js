// ---------------------------------
// Module dependencies.
// ---------------------------------

var express         = require('express');
var http            = require('http');

// Middlewares
var bodyParser      = require('body-parser');
var morgan          = require('morgan');
var methodOverride  = require('method-override');
var errorhandler    = require('errorhandler');
var nodeCache       = require('node-cache');

// CocktailFd Route module
var routes          = require('./routes');

// CocktailFd Config
var config          = require("./config");

var app             = express();
var myCache         = new nodeCache({
  stdTTL:       config.app.cache.TTL,
  checkperiod:  config.app.cache.checkperiod
});

// ---------------------------------
// ENV setup
// ---------------------------------

app.set('port', config.app.port);

// CORS Control for remote API cases
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      
    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.status(200).end();
    }
    else {
      next();
    }
};
app.use(allowCrossDomain);

app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(morgan('tiny'));


// development only
if ('development' == app.get('env')) {
	app.use(errorhandler());
}

// Setting cache headers to get caught by downstream
var setCache = function(time) {
  return setCache[time] || (setCache[time] = function(req, res, next) {
    res.set("Cache-Control", "public, max-age=" + time);
    next();
  })
};

// ---------------------------------
// Routes
// ---------------------------------
app.get('/api/ingredients/setColor/:ingredient/:color', routes.setColor);
app.get('/api/ingredients/setOpacity/:ingredient/:opacity', routes.setOpacity);
app.get('/api/missing', setCache(600), routes.findCocktailsByMissingIds);
app.get('/api/missing/:array', setCache(600), routes.findCocktailsByMissingIds);

// ---------------------------------
// Server deployment
// ---------------------------------
http.createServer(app).listen(app.get('port'), function(){
  console.log('-------------------------------------');
  console.log('Cocktail Finder - Production');
  console.log('-------------------------------------');
  console.log('Worker running');
  console.log('Worker listening @ http://localhost:%d/', app.get('port'));
});