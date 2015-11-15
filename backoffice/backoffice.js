// ---------------------------------
// Module dependencies.
// ---------------------------------

var express         = require('express');
var http            = require('http');
var path            = require('path');

// Middlewares
var bodyParser      = require('body-parser');
var morgan          = require('morgan');
var methodOverride  = require('method-override');
var errorhandler    = require('errorhandler');

// CocktailFd Config
var config          = require("./config");

// CocktailFd Route module
var routes          = require('./routes');

var app             = express();

// ---------------------------------
// ENV setup
// ---------------------------------

app.set('port', config.app.port);

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
app.use(methodOverride('X-HTTP-Method-Override'));

// Logging Middleware
morgan.token('cached', function getId(req) {
  return req.cached;
})
app.use(morgan(':method :url :status :response-time ms - :cached'));


// development only
if ('development' == app.get('env')) {
	app.use(errorhandler());
}


// ---------------------------------
// Routes
// ---------------------------------

// Bootstrap/Install routes
app.get('backofficeApi/bdd/rank/ingredients',	 routes.bdd.rankIngredients);
app.get('backofficeApi/bdd/rank/recipes',		 routes.bdd.rankRecipes);
app.get('backofficeApi/bdd/clean/',			     routes.bdd.clean);
app.get('backofficeApi/bdd/bootstrap',           routes.bdd.bootstrap);

// Routes for admin panel, that allows to set the genericUnits in DB
app.get('backofficeApi/bdd/verify',			     routes.api.giveUnverifiedCocktail);
app.post('backofficeApi/bdd/verifyCocktail',     routes.api.verifyCocktail);
app.get('backofficeApi/bdd/links',               routes.api.getLinks);
app.post('backofficeApi/bdd/editLink/',          routes.api.editLink);

// Bing routes
app.get('backofficeApi/bing/search/:search',     routes.bing.downloadPicturesIngredients);

// --------------------------------
// Ingredients
// --------------------------------
app.get('backofficeApi/ingredients',         routes.api.ingredient.getIngredients);
app.post('backofficeApi/ingredients',        routes.api.ingredient.addIngredient);
app.get('backofficeApi/ingredients/:id',     routes.api.ingredient.getIngredientById);
app.put('backofficeApi/ingredients/:id',     routes.api.ingredient.putIngredientById);
app.delete('backofficeApi/ingredients/:id',  routes.api.ingredient.deleteIngredientById);

// --------------------------------
// Recipe
// --------------------------------
app.get('backofficeApi/recipes',             routes.api.recipe.getRecipes);
app.post('backofficeApi/recipes',            routes.api.recipe.addRecipe);
app.get('backofficeApi/recipes/:id',         routes.api.recipe.getRecipeById);
app.put('backofficeApi/recipes/:id',         routes.api.recipe.putRecipeById);
app.delete('backofficeApi/recipes/:id',      routes.api.recipe.deleteRecipeById);

// --------------------------------
// Glass
// --------------------------------
app.get('backofficeApi/glasses',             routes.api.glass.getGlasses);
app.post('backofficeApi/glasses',            routes.api.glass.addGlass);
app.get('backofficeApi/glasses/:id',         routes.api.glass.getGlassById);
app.put('backofficeApi/glasses/:id',         routes.api.glass.putGlassById);
app.delete('backofficeApi/glasses/:id',      routes.api.glass.deleteGlassById);

// ---------------------------------
// Server deployment
// ---------------------------------

http.createServer(app).listen(app.get('port'), function(){
  console.log('-------------------------------------');
  console.log('Cocktail Finder BackOffice APIs');
  console.log('-------------------------------------');
  console.log('Server running');
  console.log('Server listening @ http://localhost:%d/', app.get('port'));
});