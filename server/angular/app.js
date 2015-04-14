(function(){
	var app = angular.module('cocktailFinder', ['ngTable']);

	app.controller('recipeController', ['$scope','$http', function($scope,$http)  {

		// Index in recipe array (this.data, fetched from server)
		this.currentIndex = 0;

		// Missing ingredient array, by ID
		// Gets the cookie value at page load up
		this.missing = [];

		// Recipe collection
		this.data = {};

		// Current recipe displayed
		this.currentCocktail = {};

		var that = this;

		// Load the exclude list from cookie array
		this.loadMissingFromCookie = function() {
			var dataFetched = $.cookie('cocktailFinder'); 
			if (dataFetched) {
				this.missing = JSON.parse(dataFetched);
			}
		};

		this.saveExcludeList = function() {
			// Updates the missing array cookie
			$.cookie('cocktailFinder', JSON.stringify(this.missing), { expires: 30 });
		};

        this.sortByKey = function(array, key) {
            return array.sort(function (a, b) {
                var x = a[key];
                var y = b[key];
                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            });
        };
		// Decrease the current index
		this.decreaseIndex = function() {
			if (this.currentIndex != 0) {
				this.currentIndex--;
				this.currentCocktail = this.data.cocktails[this.currentIndex];
                this.randomRendererColor();
                reloadRenderer();
			}

		};
		// Increase the current index
		this.increaseIndex = function() {
			if (this.currentIndex < Object.keys(this.data.cocktails).length - 1) {
				this.currentIndex++;
				this.currentCocktail = this.data.cocktails[this.currentIndex];
                this.randomRendererColor();
                reloadRenderer();
			}

		};
		// Append an ingredient to the missing list
		this.addMissing = function(ingredient) {

            var needToAdd = true;
            for (var i = 0; i < this.missing.length; i++) {
                if (this.missing[i]['id'] === ingredient.id) {
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
		}

        this.getRandomValue = function() {
            return Math.floor(Math.random() * 255);
        }

        this.randomRendererColor = function() {
            setParticleColorGroup({ r:this.getRandomValue(), g:this.getRandomValue(), b:this.getRandomValue(), a:this.getRandomValue()},{ r:this.getRandomValue(), g:this.getRandomValue(), b:this.getRandomValue(), a:this.getRandomValue()});
        }

		// Remove an ingredient ID from the missing list
		this.removeMissing = function(ingredient) {
			for (var i = 0; i < this.missing.length; i++) {
		        if (this.missing[i]['id'] === ingredient.id) {
	 			   this.missing.splice(i, 1);
		        }
	    	}
            this.saveExcludeList();
			this.reloadData();
		}

		// Fetch data from API with the exclude list in param
		this.reloadData = function() {
			var route = "/api/missing/";

	        for (var i = 0; i < this.missing.length; ++i) {
        		if (i == this.missing.length - 1) {
					route += this.missing[i].id;
				} else {
					route += this.missing[i].id + ',';
				}
			}

			route_ingredients = "/api/"

			$http.get(route).success(function(data){
				that.currentCocktail = data.cocktails[0];
				// Data fetched from server
   				that.data = data;
                that.currentIndex = 0;
			});
		}
		// Initiates request at page load up
		try {
			initRenderer();
		}
		catch(e) {

		}
		this.reloadData();
		this.loadMissingFromCookie();
	}]);

	app.controller('adminCongtroller',['$scope','$http', function($scope,$http){
		this.ingredients = [];
        this.cocktails = [];
		var that = this;
		$http.get("/api/ingredients").success(function(data){
			that.ingredients = data.ingredients;
		});
        $http.get("/api/allcocktails").success(function(data) {
            that.cocktails = data;
        });
	}]);
})();
