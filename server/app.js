// ---------------------------------
// Module dependencies.
// ---------------------------------

var express = require('express');
var http = require('http');
var path = require('path');

// CocktailFd Route module
var routes = require('./routes');

var app = express();

// ---------------------------------
// ENV setup
// ---------------------------------

app.set('port', process.env.PORT || 3000);

app.use(express.favicon());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());

app.use(app.router);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.locals({
    title: 'Cocktail Finder'    // default title
});

// ---------------------------------
// Routes
// ---------------------------------

// App routes
app.get('/', routes.site.index);

// API Routes
app.get('/cocktails', routes.recipes.find);

//app.get('/recipes', routes.recipes.list);
//app.get('/recipes/:id', routes.recipes.show);
//app.del('/recipes/:id', routes.recipes.del);
//app.get('/ingredients', routes.ingredients.list);


// ---------------------------------
// Server deployment
// ---------------------------------

http.createServer(app).listen(app.get('port'), function(){
  console.log('-------------------------------------');
  console.log('Cocktail Finder');
  console.log('-------------------------------------');
  console.log('Server running');
  console.log('Server listening @ http://localhost:%d/', app.get('port'));
});
