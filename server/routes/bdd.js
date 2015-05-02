var ControllerBootstrap = require('../controller/controllerBootstrap');

exports.rankIngredients = function (req, res, next) {
    ControllerBootstrap.rankIngredients(function(err, result) {
      res.json(result);
    });
};

exports.rankRecipes = function (req, res, next) {
    ControllerBootstrap.rankRecipes(function(err, result) {
      res.json(result);
    });
};