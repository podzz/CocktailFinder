var Ingredient  = require('../models/ingredient');

/**
 * GET /ingredients
 */
exports.list = function(req, res, next) {
  Ingredient.getAll(function(err, users) {
    if (err) {
      return next(err);
    }
    res.render('ingredients', {
      ingredients: ingredients
    });
  });
};

/**
 * POST /users
 */
exports.create = function (req, res, next) {
  Ingredient.create({
    name: req.body['name']
  }, function (err, user) {
    if (err) {
      return next(err);
    }
    res.redirect('/ingredients/' + ingredients.id);
  });
};
