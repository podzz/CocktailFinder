requirejs.config({
    baseUrl: 'static/',
    paths: {
        'app': 'front/js/app',
        'angular': 'common/js/lib/angular.min',
        'jquery': 'common/js/lib/jquery.min',
        'jquery.cookie': 'common/js/lib/jquery.cookie',
        'physics/lib': 'physics/js/lib',
        'physics/app': 'physics/js/app'
    },
    shim: {
        'angular': {
            exports: 'angular'
        },
        'jquery': {
            exports: "$"
        },

        'physics/lib/copyshader' : ['physics/lib/three'],
        'physics/lib/maskpass' : ['physics/lib/three'],
        'physics/lib/renderpass' : ['physics/lib/three'],
        'physics/lib/effectcomposer' : ['physics/lib/three'],
        'physics/lib/shaderpass' : ['physics/lib/three'],
        'physics/lib/horizontalblurshader' : ['physics/lib/three'],
        'physics/lib/verticalblurshader': ['physics/lib/three'],
        'physics/lib/tresholdshader': ['physics/lib/three'],
        'physics/lib/metaballshader': ['physics/lib/three']
    }
});

require(['angular',
        'physics/lib/pixi',
        'physics/lib/liquidfun',
        'physics/lib/TweenMax.min',
        'physics/lib/three',
        'physics/lib/maskpass',
        'physics/lib/copyshader',
        'physics/lib/effectcomposer',
        'physics/lib/renderpass',
        'physics/lib/shaderpass',
        'physics/lib/horizontalblurshader',
        'physics/lib/verticalblurshader',
        'physics/lib/tresholdshader',
        'physics/lib/metaballshader',
        'physics/app/Parser',
        'physics/app/Collision',
        'physics/app/managerObject',
        'physics/app/Particle',
        'physics/app/Recipe',
        'physics/app/Tools',
        'physics/app/Graphics',
        'physics/app/Animation',
        'physics/app/Events',
        'physics/app/Contact',
        'physics/app/Main',
        'jquery',
        'jquery.cookie',
        'app'],
    function () {
        angular.element(document).ready(function () {
            angular.bootstrap(document, ['cocktailFinder']);
        });
    });