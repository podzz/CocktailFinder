var ControllerCocktail = require('../controller/controllerCocktail');
var ControllerIngredients = require('../controller/controllerIngredient');

exports.findCocktails = function (req, res, next) {
    var param = req.params.id;
    if (req.params.ids)
        param = req.params.ids.split(',');

    ControllerCocktail.getCocktails(param, function (err, result) {
        res.json(result);
    });
};

exports.findCocktailsByMissingIds = function (req, res, next) {
    var constructArray = null;
    if (req.params.array) {
        constructArray = req.params.array.split(',');
    }

    ControllerCocktail.getCocktailByExcludeIngredients(constructArray, function (err, result) {
        res.json(result);
    });
};

exports.setColor = function(req, res, next) {
    if (req.params.ingredient && req.params.color)
        ControllerIngredients.setColor(req.params.ingredient, req.params.color, function(err, result) {
           res.json(result);
        });

};

exports.setOpacity = function(req, res, next) {
    if (req.params.ingredient && req.params.opacity)
        ControllerIngredients.setOpacity(req.params.ingredient, req.params.opacity, function(err, result) {
            res.json(result);
        });

};

exports.getRoot = function(req, res, next) {

};

