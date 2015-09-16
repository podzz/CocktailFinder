(function () {
    var app = angular.module('cocktailFinder', []);
    
    app.controller('recipeController', ['$scope', '$http', function ($scope, $http) {
        // Current recipe displayed
        this.currentCocktail = {};
        this.data = {};

        var that = this;

        // Fetch data from API with the exclude list in param
        this.reloadData = function () {
            var route = "bdd/verify/";

            $http.get(route).success(function (data) {
                that.data = data;
                that.currentCocktail = data.cocktails[0];
            });
        }

        this.saveData = function () {
            that.data.cocktails[0] = that.currentCocktail;
            var route = "bdd/verifyCocktail/";

            $http.post(route, that.data).success(function (data) {
                that.reloadData();
            });
        }
        this.reloadData();
    }]);

})();
