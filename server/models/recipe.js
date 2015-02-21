// Getting neo4j object
var neo4j = require('neo4j');

// Connection do DB
var db = new neo4j.GraphDatabase(
    process.env['NEO4J_URL'] ||
    process.env['GRAPHENEDB_URL'] ||
    'http://localhost:7474'
);

// ----------------------------------------
// Constructor
// ----------------------------------------

var Recipe = module.exports = function Recipe(_node) {
  this._node = _node
}

// ----------------------------------------
// Attributes
// ----------------------------------------

Object.defineProperty(Recipe.prototype, 'id', {
    get: function () { return this._node.id; }
});

Object.defineProperty(Recipe.prototype, 'name', {
    get: function () {
        return this._node.data['name'];
    },
    set: function (name) {
        this._node.data['name'] = name;
    }
});

// ----------------------------------------
// Methods
// ----------------------------------------

// Save the node state
Recipe.prototype.save = function(callback) {
    this._node.save(function(err) {
        callback(err);
    });
};

// use a Cypher query to delete both this Recipe and the links on it.
Recipe.prototype.del = function(callback) {
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
Recipe.get = function(id, callback) {
    db.getNodeById(id, function(err, node) {
        if (err) return callback(err);
        callback(null, new Recipe(node));
    });
};

// Get all Recipes
Recipe.getAll = function(callback) {
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
