$(function () {
    // Instance the tour
    require(['bootstrap.tour'], function () {
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
                },
                {
                    element: "#color",
                    title: "Ingrédient indisponible",
                    content: "Si vous ne diposez pas de cet ingrédient, il suffit de cliquer sur celui-ci pour le supprimer.",
                    placement: 'bottom',
                    backdrop: true
                }
            ]
        });

// Initialize the tour
        tour.init();

// Start the tour
        tour.start();
    });
});