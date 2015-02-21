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

var Ingredient = module.exports = funciton Ingredient(_node) {
  this._node = _node
}

// ----------------------------------------
// Attributes
// ----------------------------------------

Object.defineProperty(Ingredient.prototype, 'id', {
    get: function () { return this._node.id; }
});

Object.defineProperty(Ingredient.prototype, 'name', {
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
Ingredient.prototype.save = function(callback) {
    this._node.save(function (err) {
        callback(err);
    });
};

// use a Cypher query to delete both this Ingredient and the recipes using it.
Ingredient.prototype.del = function(callback) {
    var query = [
        'MATCH (ingr:Ingredient)',
        'WHERE ID(ingr) = {ingrId}',
        'DELETE ingr',
        'WITH ingr',
        'MATCH (ingr) -[rel]- (recipe:Recipe)',
        'DELETE rel',
        'DELETE recipe'
    ].join('\n')

    var params = {
        ingrId: this.id
    };

    db.query(query, params, function (err) {
        callback(err);
    });
};

// Get the Ingredient by ID
Ingredient.get = function (id, callback) {
    db.getNodeById(id, function (err, node) {
        if (err) return callback(err);
        callback(null, new Ingredient(node));
    });
};

// Get all Ingredients
Ingredient.getAll = function (callback) {
    var query = [
        'MATCH (ing:Ingredient)',
        'RETURN ing',
    ].join('\n');

    db.query(query, null, function (err, results) {
        if (err) return callback(err);
        var ingrs = results.map(function (result) {
            return new Ingredient(result['ing']);
        });
        callback(null, ingrs);
    });
};


