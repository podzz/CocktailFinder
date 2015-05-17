var request = require("request");

var ControllerIngredient = module.exports = function ControllerIngredient(_node) {
}

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

// use a Cypher query to delete both this Ingredient and the recipes using it.
ControllerIngredient.setColor = function(ingredient_id, color, callback)
{
    var query = 'MATCH (i:Ingredient) WHERE i.index="' + ingredient_id + '" SET i.selectedColor ="' + color + '";';
    var cb = function (err, data) {
        if (err)
            return callback(err,null);
        var data_formatted = {response: data};

        callback(null, data_formatted);
    };
    cypher(query, cb);
}


// Get the Ingredients list for a recipe
ControllerIngredient.getIngredientsOfRecipe = function (recipe_id, callback) {
    var query = [
        'MATCH (re:Recipe {index:\'' + recipe_id + '\'})-->(ingredient:Ingredient)',
        'return ingredient'
    ].join(' ')
    db.query(query, null, function (err, results) {
        if (err) return callback(err);
        var ingrs = results.map(function (result) {
            return new Ingredient(result['ingredient']);
        });
        callback(null, ingrs);
    });
}

// Get the Ingredient by ID
ControllerIngredient.getIngredients = function (id, callback) {
    db.getNodeById(id, function (err, node) {
        if (err) return callback(err);
        callback(null, new Ingredient(node));
    });
};

// Get all Ingredients
ControllerIngredient.getAll = function (callback) {
    var query = [
        'MATCH (ing:Ingredient)',
        'RETURN ing.index,ing.name, ing.colors',
    ].join('\n');

    db.query(query, null, function (err, results) {
        if (err) return callback(err);

        var formatted = {
            ingredients: []
        };

        // Formatting ingredients
        for (var i = 0; i < results.length; ++i) {
            formatted.ingredients.push({
                index: results[i]['ing.index'],
                name: results[i]['ing.name'],
                colors: results[i]['ing.colors']
            });
        }
        // Async return call
        callback(null, formatted);
    });
};


