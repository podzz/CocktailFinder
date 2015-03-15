(function(){
	var app = angular.module('cocktailFinder', []);

	app.controller('recipeController', ['$scope','$http', function($scope,$http)  {

		// Index in recipe array (this.data, fetched from server)
		this.currentIndex = 0;
		// Missing ingredient array, by ID
		this.missing = [];

		// Recipe collection
		this.data = {};

		// Current recipe displayed
		this.currentCocktail = {};

		var that = this;

		$http.get('/cocktails').success(function(data){
			that.currentCocktail = data.cocktails[0];
			// Data fetched from server
			that.data = data;
		});

		// Decrease the current index
		this.decreaseIndex = function() {
			if (this.currentIndex != 0) {
				this.currentIndex--;
				this.currentCocktail = this.data.cocktails[this.currentIndex];
			}
		};
		// Increase the current index
		this.increaseIndex = function() {
			if (this.currentIndex < Object.keys(this.data.cocktails).length - 1) {
				this.currentIndex++;
				this.currentCocktail = this.data.cocktails[this.currentIndex];
			}
		};
		// Append an ingredient to the missing list
		this.addMissing = function(ingredient) {
            if (this.missing.indexOf(ingredient) == -1)
			    this.missing.push(ingredient);
			this.reloadData();
		}
		// Remove an ingredient ID from the missing list
		this.removeMissing = function(ingredient) {
			for (var i = 0; i < this.missing.length; i++) {
		        if (this.missing[i]['id'] === ingredient.id) {
	 			   this.missing.splice(i, 1);
		        }
	    	}
		}
		this.reloadData = function() {
			var route = "/cocktails/missing/";

	        for (var i = 0; i < this.missing.length; ++i) {
        		if (i == this.missing.length - 1) {
					route += this.missing[i].id;
				} else {
					route += this.missing[i].id + ',';
				}
			}

			$http.get(route).success(function(data){
				that.currentCocktail = data.cocktails[0];
				// Data fetched from server
   				that.data = data;
			});
		}
	}]);
})();
