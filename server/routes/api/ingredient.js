var ControllerIngredient = require('../../controller/controllerIngredient');

exports.getIngredients = function (req, res, next) {
    controllerIngredient.getIngredients(param, function (err, result) {
        res.json(result);
    });
};

exports.addIngredient = function (req, res, next) {
    controllerIngredient.addIngredient(constructArray, function (err, result) {
        res.json(result);
    });
};

exports.getIngredientById = function(req, res, next) {
    var param = req.params.id;

    controllerIngredient.getIngredientById(param, function (err, result) {
        res.json(result);
    });
};

exports.putIngredientById = function(req, res, next) {
    var param = req.params.id;

    controllerIngredient.putIngredientById(param, function (err, result) {
        res.json(result);
    });
};

exports.deleteIngredientById = function(req, res, next) {
    var param = req.params.id;

    controllerIngredient.deleteIngredientById(param, function (err, result) {
        res.json(result);
    });
};
