var request = require("request");

var ControllerIngredient = module.exports = function ControllerIngredient(_node) {
}

// use a Cypher query to delete both this Ingredient and the recipes using it.
ControllerIngredient.prototype.del = function (callback) {
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


