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
        'physics/lib': 'physics/js/lib',
        'physics/app': 'physics/js/app',
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
    'physics/lib/pixi',
    'physics/lib/liquidfun',
    'physics/app/thresoldFilter',
    'physics/app/variables',
    'physics/app/managerParser',
    'physics/app/managerCollision',
    'physics/app/managerObject',
    'physics/app/managerShape',
    'physics/app/managerParticle',
    'physics/app/managerRecipe',
    'physics/app/cocktailRenderer',
    'physics/app/managerAnimation',
    'physics/lib/timeline',
    'jquery',
    'jquery.cookie',
    'app'],
 function (app) {
    angular.element(document).ready(function () {
        angular.bootstrap(document, ['cocktailFinder']);
    });
});