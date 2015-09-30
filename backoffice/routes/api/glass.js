var controllerGlass = require('../../controller/controllerGlass');

exports.getGlasses = function (req, res, next) {
    controllerGlass.getGlasses(function (err, result) {
        res.json(result);
    });
};

exports.addGlass = function (req, res, next) {
    controllerGlass.addGlass(req.body, function (err, result) {
        res.json(result);
    });
};

exports.getGlassById = function(req, res, next) {
    var param = req.params.id;

    controllerGlass.getGlassById(param, function (err, result) {
        res.json(result);
    });
};

exports.putGlassById = function(req, res, next) {
    controllerGlass.putGlassById(req.params.id, req.body, function (err, result) {
        res.json(result);
    });
};

exports.deleteGlassById = function(req, res, next) {
    var param = req.params.id;

    controllerGlass.deleteGlassById(param, function (err, result) {
        res.json(result);
    });
};
