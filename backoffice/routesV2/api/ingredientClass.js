var ControllerIngredientClass = require('../../controllerV2/controllerIngredientClass');

exports.getIngredients = function (req, res, next) {
    ControllerIngredientClass.getIngredients(function(err, result) {
      res.json(result);
    });
};
