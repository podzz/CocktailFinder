/**
 * Created by Francois on 02/10/15.
 */
// For any third party dependencies, like jQuery, place them in the lib folder.

// Configure loading modules from the lib directory,
// except for 'app' ones, which are in a sibling
// directory.
requirejs.config({
    baseUrl: 'static/',
    paths: {
        'app': 'front/js/app',
        'angular': 'common/js/lib/angular.min',
        'jquery': 'common/js/lib/jquery.min',
        'jquery.cookie': 'common/js/lib/jquery.cookie',
        'physics': 'physics/js',
        'pixi': 'physics/js/pixi'
    },
    shim: {
        'angular': {
            exports: 'angular'
        },
        'jquery': {
            exports: "$"
        }
    }
});

require(['angular',
    'pixi',
    'physics/liquidfun',
    'physics/thresoldFilter',
    'physics/variables',
    'physics/managerParser',
    'physics/managerCollision',
    'physics/managerObject',
    'physics/managerShape',
    'physics/managerParticle',
    'physics/managerRecipe',
    'physics/cocktailRenderer',
    'physics/managerAnimation',
    'physics/timeline',
    'jquery',
    'jquery.cookie',
    'app'],
 function (app) {
    angular.element(document).ready(function () {
        angular.bootstrap(document, ['cocktailFinder']);
    });
});