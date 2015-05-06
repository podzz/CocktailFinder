// Cocktail API

// Getting neo4j object
var neo4j = require('neo4j');

// Connection do DB
var db = new neo4j.GraphDatabase(
    process.env['NEO4J_URL'] ||
    process.env['GRAPHENEDB_URL'] ||
    'http://localhost:7474'
    );

var ControllerBootstrap = function ControllerBootstrap(_node) {
};

// Foreach ingredient, set a value named "recipeCount"
ControllerBootstrap.rankIngredients = function(callback) {
    var query = 'MATCH (r:Recipe)-->(i:Ingredient) WITH i, count(r) AS cnt SET i.recipeCount = cnt;';
    db.query(query, null, function (err, results) {
        // ICO Request fail
        if (err) {
          return callback(err);
        }
        // Async return call
        callback(null, "Ingredient Boostrap Successful");
    });
};

// Foreach recipe, set a value named "recipeStore"
ControllerBootstrap.rankRecipes = function(callback) {
    var query = 'MATCH (r:Recipe)--(i:Ingredient) WITH r, avg(i.recipeCount) AS average, count(i) as ingrCount SET r.recipeScore = average;';
    db.query(query, null, function (err, results) {
        // ICO Request fail        
        if (err) {
          return callback(err);
        }
        // Async return call
        callback(null, "Recipe Boostrap Successful");
    });
};

ControllerBootstrap.clean = function(callback) {
    var query = 'MATCH (r:Recipe)-[re]-() WHERE r.recipeScore <300 DELETE r, re';
    db.query(query, null, function (err, results) {
        // ICO Request fail        
        if (err) {
          return callback(err);
        }
        // Async return call
        callback(null, "Recipes deleted");
    });
};

module.exports = ControllerBootstrap;