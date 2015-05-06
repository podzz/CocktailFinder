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
exports.clean = function (req, res, next) {
    ControllerBootstrap.clean(function(err, result) {
      res.json(result);
    });
};

exports.bootstrap = function (req, res, next) {
	ControllerBootstrap.rankIngredients(function(err, result) {
		ControllerBootstrap.rankRecipes(function(err, result) {
			ControllerBootstrap.clean(function(err, result) {
				res.json(result);
			});
		});
	});
};
