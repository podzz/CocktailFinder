var controllerRecipe = require('../../controller/controllerRecipe');

exports.getRecipes = function (req, res, next) {
    controllerRecipe.getRecipes(function (err, result) {
        res.json(result);
    });
};

exports.addRecipe = function (req, res, next) {
    controllerRecipe.addRecipe(req.body, function (err, result) {
        res.json(result);
    });
};

exports.getRecipeById = function(req, res, next) {
    var param = req.params.id;

    controllerRecipe.getRecipeById(param, function (err, result) {
        res.json(result);
    });
};

exports.putRecipeById = function(req, res, next) {
    controllerRecipe.putRecipeById(req.params.id, req.body, function (err, result) {
        res.json(result);
    });
};

exports.deleteRecipeById = function(req, res, next) {
    var param = req.params.id;

    controllerRecipe.deleteRecipeById(param, function (err, result) {
        res.json(result);
    });
};
