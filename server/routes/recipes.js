var Recipe = require('../models/recipe');
var Ingredient = require('../models/ingredient');
var Compose = require('../models/compose');
var ControllerCompose = require('../controller/controllerCompose');
var ControllerIngredient= require('../controller/controllerIngredient');
var ControllerRecipe = require('../controller/controllerRecipe');

exports.find = function (req, res, next) {
    var arr = [];
    for (var i = 0; i < 5; i++) {
        arr.push(Math.round(Math.random() * 1000))
    }

    ControllerRecipe.getCocktailsById(function(err, result) {
      res.json(result);
    }, arr);
};


/**
 * GET /recipes
 */
exports.list = function (req, res, next) {
    ControllerRecipe.getAll(function (err, recipes) {
        if (err) return next(err);
        res.render('recipes', {
            recipes: recipes
        });
    });
};

/**
 * GET /recipe/:id
 */
exports.show = function (req, res, next) {
    ControllerRecipe.getId(req.params.id, function (err, recipe_out) {
        if (err) return next(err);
        ControllerIngredient.getIngredientsOfRecipe(req.params.id, function (err, ingredients) {
            if (err) return next(err);
            ControllerCompose.getComposeOfRecipe(req.params.id, function (err, composed_list) {
                if (err) return next(err);
                res.render('recipe', {
                    recipe: recipe_out,
                    ingredients: ingredients,
                    composed : composed_list
                });
            });
        });
    });
};

/**
 * DELETE /recipe/:id
 */
exports.del = function (req, res, next) {
    ControllerRecipe.get(req.params.id, function (err, recipe) {
        if (err) return next(err);
        ControllerRecipe.del(function (err) {
            if (err) return next(err);
            res.redirect('/recipes');
        });
    });
};
