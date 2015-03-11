(function(){
	var fetchedData = {
		"cocktails": [
		{
			"name": "MyCoktail",
			"ingredients": [
			{
				"name": "jus de carote",
				"quantity": 4,
				"unity": "cl"
			},
			{
				"name": "ju carote",
				"quantity": 12,
				"unity": "cl"
			}
			]
		},
		{
			"name": "MyCoktail",
			"ingredients": [
			{
				"name": "jus de carote",
				"quantity": 4,
				"unity": "cl"
			},
			{
				"name": "ju carote",
				"quantity": 12,
				"unity": "cl"
			}
			]
		}
		]
	}
	var app = angular.module('cocktailFinder', []);

	app.controller('recipeController', function() {
		this.data = fetchedData;
		this.currentCocktail = this.data.cocktails[0];
		this.currentIndex = 0;

		// Request data on the server
		this.fetchData = function() {
		    $http.get('/store-products.json').success(function(data){
		      store.products = this.data;
		    });
		};
		// Decrease the current index 
		this.decreaseIndex = function() {
			if (this.currentIndex != 0) {
				this.currentIndex--;
				this.currentCocktail = this.data[this.currentIndex];
			}
		};
		this.increaseIndex = function() {
			if (this.currentIndex < Object.keys(data.cocktails).length - 1) {
				this.currentIndex++;
				this.currentCocktail = this.data[this.currentIndex];
			}
		}
	});
})();
