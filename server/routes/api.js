var ControllerCocktail = require('../controller/controllerCocktail');

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
    ControllerCocktail.getCocktailsById([req.params.id], function(err, result) {
      res.json(result);
    });
};

exports.findCocktailsByMissingIds = function (req, res, next) {
    var arr = [4, 8, 2];

    ControllerCocktail.getCocktailsByMissingIds(arr, 5, function(err, result) {
      res.json(result);
    });
};