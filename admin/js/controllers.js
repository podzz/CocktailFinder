angular.module('adminApp.controllers',[]).controller('IngredientListController',function($scope,$state,popupService,$window, Ingredient){

    $scope.ingredients = Ingredient.query();

    $scope.deleteIngredient = function(ingredient){
        if (popupService.showPopup('Do you really want to delete this ingredient ?')) {
            ingredient.$delete(function(){
                $window.location.href = '';
            });
        }
    }

}).controller('IngredientViewController', function($scope, $stateParams, Ingredient){

    $scope.ingredient = Ingredient.get({id: $stateParams.id});

}).controller('IngredientCreateController', function($scope, $state, $stateParams, Ingredient){

    $scope.ingredient = new Ingredient();

    $scope.addIngredient = function(){
        $scope.ingredient.$save(function() {
            $state.go('ingredients');
        });
    }

}).controller('IngredientEditController', function($scope, $state, $stateParams, Ingredient){

    $scope.updateIngredient = function(){
        $scope.ingredient.$update(function() {
            $state.go('ingredients');
        });
    };

    $scope.loadIngredient = function(){
        $scope.ingredient = Ingredient.get({id: $stateParams.id});
    };

    $scope.loadIngredient();
}).controller('GlassListController',function($scope,$state,popupService,$window, Glass){

    $scope.glasses = Glass.query();

    $scope.deleteGlass = function(glass) {
        console.log(glass);
        if (popupService.showPopup('Do you really want to delete this glass ?')) {
            glass.$delete(function(){
                $window.location.href = '';
            });
        }
    }

}).controller('GlassViewController', function($scope, $stateParams, Glass){

    $scope.glass = Glass.get({id: $stateParams.id});

}).controller('IngredientCreateController', function($scope, $state, $stateParams, Glass){

    $scope.glass = new Glass();

    $scope.addGlass = function(){
        $scope.glass.$save(function() {
            $state.go('glasses');
        });
    }

}).controller('GlassEditController', function($scope, $state, $stateParams, Glass){

    $scope.updateGlass = function(){
        $scope.glass.$update(function() {
            $state.go('glasses');
        });
    };

    $scope.loadGlass = function(){
        $scope.glass = Glass.get({id: $stateParams.id});
    };

    $scope.loadGlass();
});