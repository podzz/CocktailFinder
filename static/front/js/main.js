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
        'app': '../../../front/js/app',
        'physics': '../../../physics/js',
        'angular': 'angular.min',
        'angular.route': 'angular-route',
        'angular.cookies': 'angular-cookies.min',

        'cocktail': '../../../front/js/cocktail',

        'bootstrap.tour': 'bootstrap-tour-standalone',

        'jquery': 'jquery.min'
    },
    shim: {
        'angular': {
            deps:['jquery'],
            exports: 'angular'
        },
        'angular.route': ['angular'],
        'angular.cookies': ['angular'],
        'bootstrap.tour': ['jquery'],
        'cocktail': ['jquery']
    },
    deps: ['cocktail']
});
// Start loading the main app file. Put all of
// your application logic in there.
requirejs([
    'angular',
    'angular.route',
    'angular.cookies',
    'bootstrap.tour',
    'pixi',
    'liquidfun',
    'physics/variables',
    'physics/managerParser',
    'physics/managerCollision',
    'physics/managerObject',
    'physics/managerShape',
    'physics/managerParticle',
    'physics/managerRecipe',
    'physics/cocktailRenderer',
    'physics/managerAnimation',
    'jquery.cookie',
    'timeline',
    'cocktail',
    'app'
], function(app) {
    angular.element(document).ready(function() {
        angular.bootstrap(document, ['cocktailFinder']);
    })
});
