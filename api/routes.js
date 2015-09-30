var ControllerCocktail = require('./controllerCocktail');

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