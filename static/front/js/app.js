/**
 * Created by Francois on 02/10/15.
 */
    define(['angular'], function() {
        var app = angular.module('cocktailFinder', []);

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

            this.opacity = 0;

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
                $(".bar").toggle("slow");
                $("#hide").toggle();
                $("#show").toggle();
            }

            this.sound = function () {
                mute();
            }

            // Load the exclude list from cookie array
            this.loadMissingFromCookie = function () {
                var dataFetched = $.cookie('cocktailFinder');
                if (dataFetched) {
                    this.missing = JSON.parse(dataFetched);
                    console.log(this.missing);
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
                    this.cocktailRenderer.reload(this.currentCocktail.ingredient, that.currentCocktail.recipe_index);
                }
            };
            // Increase the current index
            this.increaseIndex = function () {
                if (this.currentIndex < Object.keys(that.data.cocktails).length - 1) {
                    this.currentIndex++;
                    this.currentCocktail = that.data.cocktails[this.currentIndex];
                    this.cocktailRenderer.reload(that.currentCocktail.ingredient, that.currentCocktail.recipe_index);
                }
            };
            // Append an ingredient to the missing list
            this.addMissing = function (ingredient) {
                var needToAdd = true;
                for (var i = 0; i < this.missing.length; i++) {
                    if (this.missing[i].index === ingredient.index) {
                        needToAdd = false;
                    }
                }
                if (needToAdd) {
                    this.missing.push(ingredient);
                    this.missing = this.sortByKey(this.missing, "name");
                }
                this.saveExcludeList();
                this.reloadData();
            }

            // For Dev purpose
            this.removeCookie = function () {
                $.removeCookie('cocktailFinder');
                this.missing = [];
                this.reloadData();
            }

            // Remove an ingredient ID from the missing list
            this.removeMissing = function (ingredient) {
                for (var i = 0; i < this.missing.length; i++) {
                    if (this.missing[i].index === ingredient.index) {
                        this.missing.splice(i, 1);
                    }
                }
                this.saveExcludeList();
                this.reloadData();
                this.cocktailRenderer.reload();
            }

            this.setSelectedColor = function (ingr, color) {
                ingr.selectedColor = color;
                var route = ingr.index + '/' + color.substring(1);
                $http.get("/api/ingredients/setColor/" + route).success(function (data) {
                    that.cocktailRenderer.reload(that.currentCocktail.ingredient, that.currentCocktail.recipe_index);
                })
            }

            this.setOpacity = function (ingr) {
                var route = ingr.index + '/' + ingr.opacity;
                $http.get("/api/ingredients/setOpacity/" + route).success(function (data) {
                    that.cocktailRenderer.reload(that.currentCocktail.ingredient, that.currentCocktail.recipe_index);
                })
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
                    // Data fetched from server
                    that.data = data;
                    that.currentIndex = 0;
                    that.cocktailRenderer.reload(that.currentCocktail.ingredient, that.currentCocktail.recipe_index);
                });


            }

            this.loadMissingFromCookie();
            this.cocktailRenderer.initRenderer();
            this.reloadData();

            $("#main-menu").toggle("slow");
        }]);
        return app;
    });
