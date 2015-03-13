Recipe = require('../models/recipe.js');

// Getting neo4j object
var neo4j = require('neo4j');

// Connection do DB
var db = new neo4j.GraphDatabase(
    process.env['NEO4J_URL'] ||
    process.env['GRAPHENEDB_URL'] ||
    'http://localhost:7474'
    );

var ControllerRecipe = function ControllerRecipe(_node) {
};
// use a Cypher query to delete both this Recipe and the links on it.
ControllerRecipe.prototype.del = function(callback) {
    var query = [
    'MATCH (recipe:Recipe)',
    'WHERE ID(recipe) = {recipeId}',
    'DELETE recipe',
    'WITH recipe',
    'MATCH (recipe)-[rel]-()',
    'DELETE rel',
    ].join('\n')

    var params = {
        recipeId: this.id
    };

    db.query(query, params, function(err) {
        callback(err);
    });
};

// Get the Recipe by ID
ControllerRecipe.getId = function(id, callback) {
    var query = [
    'MATCH (re:Recipe { index:\'' + id + '\'})',
    'RETURN re'
    ].join(' ');
    db.query(query, null, function (err, results) {
        if (err) return callback(err);
        var recipes = new Recipe(results[0]['re']);
        callback(null, recipes);
    });
};

// Get all Recipes
ControllerRecipe.getAll = function(callback) {
    var query = [
    'MATCH (recipe:Recipe)',
    'RETURN recipe',
    ].join('\n');

    db.query(query, null, function (err, results) {
        if (err) return callback(err);
        var recipes = results.map(function (result) {
            return new Recipe(result['recipe']);
        });
        callback(null, recipes);
    });
};

module.exports = ControllerRecipe;
