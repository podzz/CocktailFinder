var Ingredient  = require('../models/ingredient');

/**
 * GET /ingredients
 */
exports.list = function(req, res, next) {
  Ingredient.getAll(function(err, ingredients) {
    if (err) {
      return next(err);
    }
    res.render('ingredients', {
      ingredients: ingredients
    });
  });
};

/**
 * POST /ingredients
 */
exports.create = function(req, res, next) {
  Ingredient.create({
    name: req.body['name']
  }, function (err, user) {
    if (err) {
      return next(err);
    }
    res.redirect('/ingredients/');
  });
};
