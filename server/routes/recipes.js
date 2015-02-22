var Recipe = require('../models/recipe');
var Ingredient = require('../models/ingredient');

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
    Recipe.getId(req.params.id, function (err, recipe) {
        if (err) return next(err);
        Ingredient.getIngredientsOfRecipe(req.params.id, function (err, ingredients) {
            if (err) return next(err);
                res.render('recipe', {
                    recipe: recipe,
                    ingredients: ingredients
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
