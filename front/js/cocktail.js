$(function() {
    // Instance the tour
    var tour = new Tour({
        steps: [
            {
                element: "#artist",
                title: "Bienvenue sur CocktailFinder !",
                content: "CocktailFinder est une application vous permettant de trouver des idées originales de Cocktail en un clin d'oeil !",
                placement: 'bottom',
                backdrop: true
            },
            {
                element: ".direction",
                title: "Proposition des Cocktails",
                content: "Nous vous proposons les cocktails qui correspondent aux ingrédients que vous avez chez vous.",
                placement: 'top',
                backdrop: true
            }
        ]});

// Initialize the tour
    tour.init();

// Start the tour
    tour.start(true);
});