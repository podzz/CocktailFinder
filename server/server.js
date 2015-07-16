// ---------------------------------
// Module dependencies.
// ---------------------------------

var express         = require('express');
var http            = require('http');
var path            = require('path');
var fs              = require('fs');

// Middlewares
var bodyParser      = require('body-parser');
var morgan          = require('morgan');
var methodOverride  = require('method-override');
var errorhandler    = require('errorhandler');

// CocktailFd Route module
var routes          = require('./routes');

var app             = express();

// ---------------------------------
// ENV setup
// ---------------------------------

app.set('port', process.env.PORT || 3000);

// Static assets directory path parameter
app.use(express.static(path.join(__dirname, 'angular')));
app.use(express.static(path.join(__dirname, '../front')));
app.use(express.static(path.join(__dirname, '../physics')));
app.use('/admin', express.static(path.join(__dirname, '../admin')));


// CORS Control for remote API cases
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
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
app.use(morgan('combined'));
app.use(methodOverride('X-HTTP-Method-Override'));


// development only
if ('development' == app.get('env')) {
	app.use(errorhandler());
}


// ---------------------------------
// Routes
// ---------------------------------

// App routes

// Bootstrap/Install routes
app.get('/bdd/rank/ingredients',	routes.bdd.rankIngredients);
app.get('/bdd/rank/recipes',		routes.bdd.rankRecipes);
app.get('/bdd/clean/',				routes.bdd.clean);
app.get('/bdd/bootstrap',			routes.bdd.bootstrap);

// Bing routes
app.get('/bing/search/:search',    routes.bing.downloadPicturesIngredients);

// --------------------------------
// Production API routes
// --------------------------------
app.get('/api/',           			routes.api.getRoot);

// --------------------------------
// Ingredients
// --------------------------------
app.get('/api/ingredients',         routes.api.ingredient.getIngredients);
app.post('/api/ingredients',        routes.api.ingredient.addIngredient);
app.get('/api/ingredients/:id',     routes.api.ingredient.getIngredientById);
app.put('/api/ingredients/:id',     routes.api.ingredient.putIngredientById);
app.delete('/api/ingredients/:id',  routes.api.ingredient.deleteIngredientById);

// --------------------------------
// Recipe
// --------------------------------
app.get('/api/recipes',             routes.api.recipe.getRecipes);
app.post('/api/recipes',            routes.api.recipe.addRecipe);
app.get('/api/recipes/:id',         routes.api.recipe.getRecipeById);
app.put('/api/recipes/:id',         routes.api.recipe.putRecipeById);
app.delete('/api/recipes/:id',      routes.api.recipe.deleteRecipeById);

// --------------------------------
// Glass
// --------------------------------
app.get('/api/glasses',             routes.api.glass.getGlasses);
app.post('/api/glasses',            routes.api.glass.addGlass);
app.get('/api/glasses/:id',         routes.api.glass.getGlassById);
app.put('/api/glasses/:id',         routes.api.glass.putGlassById);
app.delete('/api/glasses/:id',      routes.api.glass.deleteGlassById);

// Old
app.get('/api/cocktails',           routes.api.findCocktails);
app.get('/api/cocktails/',          routes.api.findCocktails)
app.get('/api/cocktails/:ids', 		routes.api.findCocktails);
app.get('/api/ingredients/setColor/:ingredient/:color', routes.api.setColor);
app.get('/api/ingredients/setOpacity/:ingredient/:opacity', routes.api.setOpacity);
app.get('/api/missing', 			routes.api.findCocktailsByMissingIds);
app.get('/api/missing/', 			routes.api.findCocktailsByMissingIds);
app.get('/api/missing/:array',  	routes.api.findCocktailsByMissingIds);

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