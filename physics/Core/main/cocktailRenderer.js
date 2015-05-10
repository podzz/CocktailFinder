/**
 * Created by Francois on 31/03/15.
 */

var circleArr = [];
var circleIndex = [];
var shapeArr = [];
var edgeArr = [];
var recipeArr = [];
var rotorArr = [];
var objectDisplayArr = [];
var objectPhysicsArr = [];
var objectArrInc = 0;

var right;
var left;
var timeStep = 1.0 / 60.0;
var particleSystem;
var velocityIterations = 3;
var positionIterations = 3;
var g_groundBody = null;
var test;

var particleSize = 8.5;

var METER = 100; //Meter per pixel


var OFFSET_X = 0;
var OFFSET_Y = 0;

var _len = 0;
var width = 0;
var height = 0;

var world = null;
var parser = null;
var collisionManager = null;
var animationManager = null;

var stage = null;
var pondContainer = null;
var renderers = null;

var blurFilter = null;
var thresoldFilter = null;

function CocktailRenderer() {
    width = $("#cocktailRenderer").width();
    height = $("#cocktailRenderer").height();

    /* Create World */
    world = new b2World(new b2Vec2(0, 10));

    /* Parser Init */
    parser = new Parser();
    parser.initParser();

    collisionManager = new CollisionManager();

    /* Graphics Init */
    stage = new PIXI.Stage(displayFillColor);
    pondContainer = new PIXI.DisplayObjectContainer();
    stage.addChild(pondContainer);

    /* - Filter */
    blurFilter = new PIXI.BlurFilter();
    thresoldFilter = new PIXI.TresholdFilter();
    blurFilter.blur = 10;
    pondContainer.filters = [blurFilter, thresoldFilter];

}

CocktailRenderer.prototype.initRenderer = function () {
    renderers = PIXI.autoDetectRenderer(width, height, null, true, true);  // arguments: width, height, view, transparent, antialias
    $("#cocktailRenderer").append(renderers.view);


    world.SetGravity(new b2Vec2(0, 10));
    var bd = new b2BodyDef;
    g_groundBody = world.CreateBody(bd);

    animationManager = AnimationManager();
    requestAnimFrame(animate);
}

CocktailRenderer.prototype.reload = function (glass) {
    resetTimeline();
    pondContainer.visible = false;
    delete pondContainer;
    delete stage;
    stage = new PIXI.Stage(displayFillColor);
    pondContainer = new PIXI.DisplayObjectContainer();
    stage.addChild(pondContainer);
    pondContainer.filters = [blurFilter, thresoldFilter];
    world.DestroyParticleSystem(world.particleSystems[0]);
    /* Create World */
    gravity = new b2Vec2(0, 10)
    world = new b2World(gravity);

    circleIndex = [];
    recipeArr = [];
    edgeArr = [];
    shapeArr = [];
    circleArr = [];
    rotorArr = [];

    this.LoadAnimation("AnimationManager");
}

CocktailRenderer.prototype.LoadAnimation = function(animationName) {
    world.SetGravity(new b2Vec2(0, 10));
    var bd = new b2BodyDef;
    g_groundBody = world.CreateBody(bd);

    var animationManager = new window[animationName];
}