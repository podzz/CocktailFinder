(function(){
	var fetchedData = {
		"cocktails": [
		{
			"name": "MyCocktail",
			"ingredients": [
			{
				"id": 1,
				"name": "jus de carote",
				"quantity": 4,
				"unity": "cl"
			},
			{
				"id": 2,
				"name": "ju carote",
				"quantity": 12,
				"unity": "cl"
			}
			]
		},
		{
			"name": "MyCocktail2",
			"ingredients": [
			{
				"id": 123,
				"name": "Concombre",
				"quantity": 4,
				"unity": "cl"
			},
			{
				"id": 1322,
				"name": "Tomates",
				"quantity": 120,
				"unity": "cl"
			}
			]
		}
		]
	}
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
		}
		// Remove an ingredient ID from the missing list
		this.removeMissing = function(ingredient) {
			for (var i = 0; i < this.missing.length; i++) {
		        if (this.missing[i]['id'] === ingredient.id) {
	 			   this.missing.splice(i, 1);
		        }
	    	}
		}
	}]);
})();
