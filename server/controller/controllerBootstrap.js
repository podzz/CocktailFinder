var request = require('request');
var ControllerBootstrap = function ControllerBootstrap(_node) {
};

function cypher(query, cb) {
    var txUrl = "http://localhost:7474/db/data/transaction/commit";
    request.post({
            uri: txUrl,
            json: {statements: [{statement: query}]}
        },
        function (err, res) {
            cb(err, res.body)
        })
}

// Foreach ingredient, set a value named "recipeCount"
ControllerBootstrap.rankIngredients = function (callback) {
    var query = 'MATCH (r:Recipe)-->(i:Ingredient) WITH i, count(r) AS cnt SET i.recipeCount = cnt;';
    var cb = function (err, data) {
        if (err)
            callback(err,data);
        callback(null, data);
    };
    cypher(query, cb);
}

// Foreach recipe, set a value named "recipeStore"
ControllerBootstrap.rankRecipes = function (callback) {
    var query = 'MATCH (r:Recipe)--(i:Ingredient) WITH r, avg(i.recipeCount) AS average, count(i) as ingrCount SET r.recipeScore = average;';
    var cb = function (err, data) {
        if (err)
            callback(err,data);
        callback(null, data);
    };
    cypher(query, cb);
};

ControllerBootstrap.clean = function (callback) {
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