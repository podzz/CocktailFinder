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
        front: '../../../front/js',
        physics: '../../../physics/js',
        pixi: 'pixi'
    }
});

// Start loading the main app file. Put all of
// your application logic in there.
requirejs([
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
    'front/cocktail',
    'bootstrap-tour-standalone'], function () {

})