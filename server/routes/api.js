var ControllerCocktail = require('../controller/controllerCocktail');
var ControllerIngredients = require('../controller/controllerIngredient');

exports.findFiveRandomCocktails = function (req, res, next) {
    var arr = [];
    for (var i = 0; i < 5; i++) {
        arr.push(Math.round(Math.random() * 1000))
    }

    ControllerCocktail.getCocktailsById(arr, function(err, result) {
      res.json(result);
    });
};

exports.findCocktalById = function (req, res, next) {
    ControllerCocktail.getCocktailById(req.params.id, function(err, result) {
      res.json(result);
    });
};

exports.findCocktalByName = function (req, res, next) {
    ControllerCocktail.getCocktailByName(req.params.name, function(err, result) {
      res.json(result);
    });
};

exports.findCocktailsByMissingIds = function (req, res, next) {
    var constructArray = null;
    if (req.params.array) {
		constructArray = req.params.array.split(',');
    }

    ControllerCocktail.getCocktailsByMissingIds(constructArray, 5, function(err, result) {
      res.json(result);
    });
};

exports.allIngredients = function (req, res, next) {
    ControllerIngredients.getAll(function(err, result) {
        res.json(result);
    });
};