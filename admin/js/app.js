/**
 * Created by Sandeep on 01/06/14.
 */

angular.module('adminApp', ['ui.router', 'ngResource', 'adminApp.controllers', 'adminApp.services']);

angular.module('adminApp').config(function($stateProvider, $httpProvider){
    $stateProvider.state('ingredients',{
        url:'/ingredients',
        templateUrl:'partials/ingredients.html',
        controller:'IngredientListController'
    }).state('viewIngredient',{
       url:'/ingredients/:id/view',
       templateUrl:'partials/ingredient-view.html',
       controller:'IngredientViewController'
    }).state('newIngredient',{
        url:'/ingredients/new',
        templateUrl:'partials/ingredient-add.html',
        controller:'IngredientCreateController'
    }).state('editIngredient',{
        url:'/ingredients/:id/edit',
        templateUrl:'partials/ingredient-edit.html',
        controller:'IngredientEditController'
    }).state('glasses',{
        url:'/glasses',
        templateUrl:'partials/glasses.html',
        controller:'GlassListController'
    }).state('viewGlass',{
        url:'/glasses/:id/view',
        templateUrl:'partials/glass-view.html',
        controller:'GlassViewController'
    }).state('newGlass',{
        url:'/glasses/new',
        templateUrl:'partials/glass-add.html',
        controller:'GlassCreateController'
    }).state('editGlass',{
        url:'/glasses/:id/edit',
        templateUrl:'partials/glass-edit.html',
        controller:'GlassEditController'
    });
}).run(function($state){
   $state.go('ingredients');
});