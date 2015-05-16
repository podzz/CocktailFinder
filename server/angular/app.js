(function () {
    var app = angular.module('cocktailFinder', ['ngTable']);

    app.controller('recipeController', ['$scope', '$http', function ($scope, $http) {

        // Index in recipe array (this.data, fetched from server)
        this.currentIndex = 0;

        // Missing ingredient array, by ID
        // Gets the cookie value at page load up
        this.missing = [];

        // Recipe collection
        this.data = {};

        // Current recipe displayed
        this.currentCocktail = {};

        this.cocktailRenderer = new CocktailRenderer();

        var that = this;

        this.createIceCubeOnRenderer = function () {
            createIceCube(0, -2, 0.5);
        }

        this.createCitronOnRenderer = function () {
            createCitron(0.1, -2.4, 0.6);
        }

        this.createFlow = function () {
            addFlowBottle(200, 3, 0.1);
        }

        this.hideMenu = function () {
            $("#main-menu").toggle("slow");
        }


        // Load the exclude list from cookie array
        this.loadMissingFromCookie = function () {
            var dataFetched = $.cookie('cocktailFinder');
            if (dataFetched) {
                this.missing = JSON.parse(dataFetched);
            }
        };

        this.saveExcludeList = function () {
            // Updates the missing array cookie
            $.cookie('cocktailFinder', JSON.stringify(this.missing), {expires: 30});
        };

        this.sortByKey = function (array, key) {
            return array.sort(function (a, b) {
                var x = a[key];
                var y = b[key];
                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            });
        };
        // Decrease the current index
        this.decreaseIndex = function () {
            if (this.currentIndex != 0) {
                this.currentIndex--;
                this.currentCocktail = this.data.cocktails[this.currentIndex];
                this.cocktailRenderer.reload();
            }
        };

        // Increase the current index
        this.increaseIndex = function () {
            if (this.currentIndex < Object.keys(that.data.cocktails).length - 1) {
                this.currentIndex++;
                this.currentCocktail = that.data.cocktails[this.currentIndex];
                this.cocktailRenderer.reload();
            }
        };
        // Append an ingredient to the missing list
        this.addMissing = function (ingredient) {
            var needToAdd = true;
            for (var i = 0; i < this.missing.length; i++) {
                if (this.missing[i]['id'] === ingredient.index) {
                    needToAdd = false;
                }
            }
            if (needToAdd) {
                this.missing.push(ingredient);
                this.missing = this.sortByKey(this.missing, "name");
            }
            this.saveExcludeList();
            this.reloadData();
            this.cocktailRenderer.reload();
        }

        // For Dev purpose
        this.removeCookie = function () {
            $.removeCookie('cocktailFinder');
        }

        this.getRandomValue = function () {
            return Math.floor(Math.random() * 255);
        }

        // Remove an ingredient ID from the missing list
        this.removeMissing = function (ingredient) {
            for (var i = 0; i < this.missing.length; i++) {
                if (this.missing[i]['id'] === ingredient.id) {
                    this.missing.splice(i, 1);
                }
            }
            this.saveExcludeList();
            this.reloadData();
            this.cocktailRenderer.reload();
        }

        // Fetch data from API with the exclude list in param
        this.reloadData = function () {
            var route = "/api/missing/";

            for (var i = 0; i < this.missing.length; ++i) {
                if (i == this.missing.length - 1) {
                    route += this.missing[i].index;
                } else {
                    route += this.missing[i].index + ',';
                }
            }

            $http.get(route).success(function (data) {
                that.currentCocktail = data.cocktails[0];
                console.log(JSON.stringify(data.cocktails[0]));
                // Data fetched from server
                that.data = data;
                that.currentIndex = 0;
            });


        }
        this.reloadData();
        this.loadMissingFromCookie();
        this.cocktailRenderer.initRenderer();

    }]);

    app.controller('adminCongtroller', ['$scope', '$http', function ($scope, $http) {
        this.ingredients = [];
        this.cocktails = [];
        var that = this;
        $http.get("/api/ingredients").success(function (data) {
            that.ingredients = data.ingredients;
        });
        $http.get("/api/allcocktails").success(function (data) {
            that.cocktails = data;
        });
    }]);
})();
