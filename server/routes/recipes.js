var Recipe = require('../models/recipe');
var Ingredient = require('../models/ingredient');
var Compose = require('../models/compose');

/**
 * GET /recipes
 */
exports.list = function (req, res, next) {
    Recipe.getAll(function (err, recipes) {
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
    Recipe.getId(req.params.id, function (err, recipe_out) {
        if (err) return next(err);
        Ingredient.getIngredientsOfRecipe(req.params.id, function (err, ingredients) {
            if (err) return next(err);
            Compose.getComposeOfRecipe(req.params.id, function (err, composed_list) {
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
    Recipe.get(req.params.id, function (err, recipe) {
        if (err) return next(err);
        recipe.del(function (err) {
            if (err) return next(err);
            res.redirect('/recipes');
        });
    });
};
