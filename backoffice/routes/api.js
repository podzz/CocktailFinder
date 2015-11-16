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
        res.locals.array = constructArray;
    }

    ControllerCocktail.getCocktailByExcludeIngredients(constructArray, function (err, result) {
        res.locals.result = result;
        res.json(result);
        next();
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

exports.giveUnverifiedCocktail = function (req, res, next) {
    ControllerCocktail.giveUnverifiedCocktail(function(err, result) {
      res.json(result);
    });
};

exports.verifyCocktail = function (req, res, next) {
    ControllerCocktail.verifyCocktail(req.body, function(err, result) {
      res.json(result);
    });
};

exports.getLinks = function (req, res, next) {
    ControllerCocktail.getLinks(req.body, function(err, result) {
      res.json(result);
    });
};

exports.editLink = function (req, res, next) {
    ControllerCocktail.editLink(req.body, function(err, result) {
      res.json(result);
    });
};

exports.renameLink = function (req, res, next) {
    ControllerCocktail.renameLink(req.body, function(err, result) {
        res.json(result);
    });
};