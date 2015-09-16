/**
 * Created by Sandeep on 01/06/14.
 */

angular.module('adminApp', ['ui.router', 'ngResource', 'adminApp.controllers', 'adminApp.services']);

angular.module('adminApp').config(function($stateProvider, $httpProvider){
    $stateProvider.state('ingredients',{
        url:'/ingredients',
        templateUrl:'admin/partials/ingredients.html',
        controller:'IngredientListController'
    }).state('viewIngredient',{
       url:'/ingredients/:id/view',
       templateUrl:'admin/partials/ingredient-view.html',
       controller:'IngredientViewController'
    }).state('newIngredient',{
        url:'/ingredients/new',
        templateUrl:'admin/partials/ingredient-add.html',
        controller:'IngredientCreateController'
    }).state('editIngredient',{
        url:'/ingredients/:id/edit',
        templateUrl:'admin/partials/ingredient-edit.html',
        controller:'IngredientEditController'
    }).state('glasses',{
        url:'/glasses',
        templateUrl:'admin/partials/glasses.html',
        controller:'GlassListController'
    }).state('viewGlass',{
        url:'/glasses/:id/view',
        templateUrl:'admin/partials/glass-view.html',
        controller:'GlassViewController'
    }).state('newGlass',{
        url:'/glasses/new',
        templateUrl:'admin/partials/glass-add.html',
        controller:'GlassCreateController'
    }).state('editGlass',{
        url:'/glasses/:id/edit',
        templateUrl:'admin/partials/glass-edit.html',
        controller:'GlassEditController'
    }).state('recipes',{
        url:'/recipes',
        templateUrl:'admin/partials/recipes.html',
        controller:'RecipeListController'
    }).state('viewRecipe',{
        url:'/recipes/:id/view',
        templateUrl:'admin/partials/recipe-view.html',
        controller:'RecipeViewController'
    }).state('newRecipe',{
        url:'/recipes/new',
        templateUrl:'admin/partials/recipe-add.html',
        controller:'RecipeCreateController'
    }).state('editRecipe',{
        url:'/recipes/:id/edit',
        templateUrl:'admin/partials/recipe-edit.html',
        controller:'RecipeEditController'
    }).state('verify', {
        url:'/verify',
        templateUrl: 'admin/partials/verify.html',
        controller: 'verifyController'
    }).state('unity',{
        url:'/unities',
        templateUrl:'admin/partials/unities.html',
        controller:'UnitiesController'
    });
}).run(function($state){
   $state.go('ingredients');
});