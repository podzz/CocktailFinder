angular.module('adminApp', ['ui.router', 'ngResource', 'adminApp.controllers', 'adminApp.services']);

angular.module('adminApp').config(function($stateProvider, $httpProvider){
    $stateProvider.state('ingredients',{
        url:'/ingredients',
        templateUrl:'static/back/html/partials/ingredients.html',
        controller:'IngredientListController'
    }).state('viewIngredient',{
       url:'/ingredients/:id/view',
       templateUrl:'static/back/html/partials/ingredient-view.html',
       controller:'IngredientViewController'
    }).state('newIngredient',{
        url:'/ingredients/new',
        templateUrl:'static/back/html/partials/ingredient-add.html',
        controller:'IngredientCreateController'
    }).state('editIngredient',{
        url:'/ingredients/:id/edit',
        templateUrl:'static/back/html/partials/ingredient-edit.html',
        controller:'IngredientEditController'
    }).state('glasses',{
        url:'/glasses',
        templateUrl:'static/back/html/partials/glasses.html',
        controller:'GlassListController'
    }).state('viewGlass',{
        url:'/glasses/:id/view',
        templateUrl:'static/back/html/partials/glass-view.html',
        controller:'GlassViewController'
    }).state('newGlass',{
        url:'/glasses/new',
        templateUrl:'static/back/html/partials/glass-add.html',
        controller:'GlassCreateController'
    }).state('editGlass',{
        url:'/glasses/:id/edit',
        templateUrl:'static/back/html/partials/glass-edit.html',
        controller:'GlassEditController'
    }).state('recipes',{
        url:'/recipes',
        templateUrl:'static/back/html/partials/recipes.html',
        controller:'RecipeListController'
    }).state('viewRecipe',{
        url:'/recipes/:id/view',
        templateUrl:'static/back/html/partials/recipe-view.html',
        controller:'RecipeViewController'
    }).state('newRecipe',{
        url:'/recipes/new',
        templateUrl:'static/back/html/partials/recipe-add.html',
        controller:'RecipeCreateController'
    }).state('editRecipe',{
        url:'/recipes/:id/edit',
        templateUrl:'static/back/html/partials/recipe-edit.html',
        controller:'RecipeEditController'
    }).state('verify', {
        url:'/verify',
        templateUrl: 'static/back/html/partials/verify.html',
        controller: 'verifyController'
    }).state('unity',{
        url:'/unities',
        templateUrl:'static/back/html/partials/unities.html',
        controller:'UnitiesController'
    }).state('translate',{
        url:'/translate',
        templateUrl:'static/back/html/partials/translate.html',
        controller:'TranslateController'
    });
}).run(function($state){
   $state.go('ingredients');
});