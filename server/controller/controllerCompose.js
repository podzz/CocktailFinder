Compose = require('../models/compose.js');

// Getting neo4j object
var neo4j = require('neo4j');

// Connection do DB
var db = new neo4j.GraphDatabase(
    process.env['NEO4J_URL'] ||
    process.env['GRAPHENEDB_URL'] ||
    'http://localhost:7474'
);

var ControllerCompose = module.exports = function ControllerCompose() {
}

// Get the Recipe by ID
ControllerCompose.getComposeOfRecipe = function(id_recipe, callback) {
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
