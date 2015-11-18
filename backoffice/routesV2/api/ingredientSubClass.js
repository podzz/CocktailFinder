var ControllerIngredientSubClass = require('../../controllerV2/controllerIngredientSubClass');

exports.getSubIngredients = function (req, res, next) {
    ControllerIngredientSubClass.getSubIngredients(function(err, result) {
      res.json(result);
    });
};
