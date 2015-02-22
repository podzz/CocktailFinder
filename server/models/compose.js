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

var Compose = module.exports = function Compose(_node) {
  this._node = _node
}

// ----------------------------------------
// Attributes
// ----------------------------------------

Object.defineProperty(Compose.prototype, 'quantity', {
    get: function () { return this._node.data['quantity']; },
    set : function(quantity) { this._node.data['unity'] = quantity; }
});

Object.defineProperty(Compose.prototype, 'unity', {
    get: function () { return this._node.data['unity']; },
    set: function (unity) { this._node.data['unity'] = unity; }
});

// ----------------------------------------
// Methods
// ----------------------------------------

// Save the node state
Compose.prototype.save = function(callback) {
    this._node.save(function(err) {
        callback(err);
    });
};

// Get the Recipe by ID
Compose.getComposeOfRecipe = function(id_recipe, callback) {
    var query = [
        'MATCH (re:Recipe { index:\'' + id_recipe + '\'})-[c:COMPOSED_OF]->(Ingredients)',
        'RETURN c'
    ].join(' ');
    db.query(query, null, function (err, results) {
        if (err) return callback(err);
        var compose_list = results.map(function (result) {
            return new Compose(result['c']);
        });
        callback(null, compose_list);
    });
};
