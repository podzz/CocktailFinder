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
        if (popupService.showPopup('Do you really want to delete this glass ?')) {
            glass.$delete(function(){
                $window.location.href = '';
            });
        }
    }

}).controller('GlassViewController', function($scope, $stateParams, Glass){

    $scope.glass = Glass.get({id: $stateParams.id});

}).controller('GlassCreateController', function($scope, $state, $stateParams, Glass){

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
}).controller('RecipeListController',function($scope, $state, popupService, $window, Recipe){

    $scope.recipes = Recipe.query();

    $scope.deleteRecipe = function(recipe) {
        if (popupService.showPopup('Do you really want to delete this recipe ?')) {
            recipe.$delete(function(){
                $window.location.href = '';
            });
        }
    }

}).controller('RecipeViewController', function($scope, $stateParams, Recipe){

    $scope.recipe = Recipe.get({id: $stateParams.id});

}).controller('RecipeCreateController', function($scope, $state, $stateParams, Recipe){

    $scope.recipe = new Recipe();

    $scope.addRecipe = function(){
        $scope.recipe.$save(function() {
            $state.go('recipes');
        });
    }

}).controller('RecipeEditController', function($scope, $state, $stateParams, Recipe){

    $scope.updateRecipe = function(){
        $scope.recipe.$update(function() {
            $state.go('recipes');
        });
    };

    $scope.loadRecipe = function(){
        $scope.recipe = Recipe.get({id: $stateParams.id});
    };

    $scope.loadRecipe();
}).controller('verifyController', ['$scope', '$http', function ($scope, $http) {
        // Current recipe displayed
        $scope.currentCocktail = {};
        $scope.data = {};

        $scope.copyGenericsFromQuantities = function () {
            for (var i = 0; i < $scope.data.cocktails[0].ingredient.length; i++) {
                $scope.data.cocktails[0].ingredient[i].genericQuantity = $scope.data.cocktails[0].ingredient[i].quantity;
            }
        }

        // Fetch data from API with the exclude list in param
        $scope.reloadData = function () {
            var route = "backofficeApi/bdd/verify/";

            $http.get(route).success(function (data) {
                $scope.data = data;
                $scope.currentCocktail = data.cocktails[0];
            });
        }

        $scope.saveData = function () {
            $scope.data.cocktails[0] = $scope.currentCocktail;
            var route = "backofficeApi/bdd/verifyCocktail/";
            $http.post(route, $scope.data).success(function (data) {
                $scope.reloadData();
            });
        }
        $scope.reloadData();
    }]).controller('UnitiesController', ['$scope', '$http', function ($scope, $http) {
        // Current recipe displayed
        $scope.data = {};
        $scope.dataCopy = {};

        // Fetch data from API with the exclude list in param
        $scope.reloadData = function () {
            var route = "backofficeApi/bdd/links/";

            $http.get(route).success(function (data) {
                $scope.data = data;
                $scope.dataCopy = (JSON.parse(JSON.stringify(data)));
            });
        }

        $scope.saveData = function (index) {
            var editRoute = "backofficeApi/bdd/editLink/";
            var renameRoute = "backofficeApi/bdd/renameLink/";
            var editData = {
                unity:              $scope.data[index][0],
                conversionValue:    $scope.data[index][1],
                genericUnity:       $scope.data[index][2]
            };
            if ($scope.data[index][0] == $scope.dataCopy[index][0]) {
                $http.post(editRoute, editData).success(function (data) {
                });
            } else {
                var renameData = {
                    old:  $scope.dataCopy[index][0],
                    new:  $scope.data[index][0]
                }
                $http.post(renameRoute, renameData).success(function (data) {
                    $http.post(editRoute, editData).success(function (data) {
                        $scope.reloadData();
                    });
                });
            }

        }
        $scope.reloadData();
    }]);