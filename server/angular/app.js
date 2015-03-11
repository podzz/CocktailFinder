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

	app.controller('recipeController', function() {
		// Data fetched from server
		this.data = fetchedData;
		// Current recipe displayed
		this.currentCocktail = this.data.cocktails[0];
		// Index in recipe array (this.data, fetched from server)
		this.currentIndex = 0;
		// Missing ingredient array, by ID
		this.missing = [];

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
		// Append an ingredient ID to the missing list
		this.addMissing = function(id) {
			this.missing.push(id);
			console.log("DEBUG: Missing ingredient array : " + this.missing);
		}
		// Remove an ingredient ID from the missing list
		this.removeMissing = function(id) {
			var index = this.missing.indexOf(id);
			if (index > -1) {
 			   this.missing.splice(index, 1);
			}
			console.log("DEBUG: Missing ingredient array : " + this.missing);
		}
	});
})();
