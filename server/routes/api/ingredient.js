var controllerIngredient = require('../../controller/controllerIngredient');

exports.getIngredients = function (req, res, next) {
    controllerIngredient.getIngredients(function (err, result) {
            res.set("Access-Control-Allow-Origin", "*");

        res.json(result);
    });
};

exports.addIngredient = function (req, res, next) {
    controllerIngredient.addIngredient(req.body, function (err, result) {
            res.set("Access-Control-Allow-Origin", "*");
        res.json(result);
    });
};

exports.getIngredientById = function(req, res, next) {
    var param = req.params.id;

    controllerIngredient.getIngredientById(param, function (err, result) {
            res.set("Access-Control-Allow-Origin", "*");
        res.json(result);
    });
};

exports.putIngredientById = function(req, res, next) {
    controllerIngredient.putIngredientById(req.params.id, req.body, function (err, result) {
            res.set("Access-Control-Allow-Origin", "*");
        res.json(result);
    });
};

exports.deleteIngredientById = function(req, res, next) {
    var param = req.params.id;

    controllerIngredient.deleteIngredientById(param, function (err, result) {
            res.set("Access-Control-Allow-Origin", "*");
        res.json(result);
    });
};
