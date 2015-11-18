var ControllerComposedOfRel = require('../../controllerV2/controllerComposedOfRel');

exports.getComposedOfRels = function (req, res, next) {
    ControllerComposedOfRel.getComposedOfRels(function(err, result) {
      res.json(result);
    });
};
