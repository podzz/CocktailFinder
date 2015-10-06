/**
 * Created by Francois on 02/10/15.
 */
// For any third party dependencies, like jQuery, place them in the lib folder.

// Configure loading modules from the lib directory,
// except for 'app' ones, which are in a sibling
// directory.
requirejs.config({
    baseUrl: 'static/common/js/lib',
    paths: {
        'physics': '../../../physics/js',
        'angular': 'angular.min',
        'app': '../../../front/js/app',
        'cocktail': '../../../front/js/cocktail',
        'jquery': 'jquery.min'
    },
    shim: {
        'angular': {
            exports: 'angular'
        },
        'jquery': {
            exports: "$"
        },
        'underscore': {
            exports: "_"
        },
        'cocktail': ['jquery', 'jquery.cookie', 'angular'],
        'app':['cocktail'],
        deps: ['cocktail']
    }
});

require(['app']);

/*
 'jquery', 'jquery.cookie', 'angular','timeline', 'pixi', 'liquidfun',
 'physics/thresoldFilter',
 'physics/variables',
 'physics/managerParser',
 'physics/managerCollision',
 'physics/managerObject',
 'physics/managerShape',
 'physics/managerParticle',
 'physics/managerRecipe',
 'physics/cocktailRenderer',
 'physics/managerAnimation'],
 */