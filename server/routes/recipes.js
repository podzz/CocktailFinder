var ControllerRecipe = require('../controller/controllerRecipe');

/**
 * GET /recipes
 */
exports.list = function (req, res, next) {
    ControllerRecipe.getAll(null, null, function (err, result) {
        res.json(result);
    });
};

/**
 * GET /recipe/:id
 */
exports.find = function (req, res, next) {
	console.log("Coucou");
    var param = req.params.id;

    ControllerRecipe.get(param, function (err, result) {
        res.json(result);
    });
};

/**
 * DELETE /recipe/:id
 */
exports.del = function (req, res, next) {
    var param = req.params.id;

    ControllerRecipe.del(param, function (err, result) {
        res.json(result);
    });
};
