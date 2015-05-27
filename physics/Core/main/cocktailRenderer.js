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

var currentIngredients = null;
var currentRecipe = null;
var rotorBodyWidth = 0;
var rotorBodyHeight = 0;

var objectArrInc = 0;

var right;
var left;
var timeStep = 1.0 / 60.0;
var particleSystem;
var velocityIterations = 3;
var positionIterations = 3;
var g_groundBody = null;
var test;

var particleSize = 10;

var METER = 100; //Meter per pixel

var world = null;
var parser = null;
var collisionManager = null;
var animationManager = null;
var shapeManager = null;

var stage = null;
var particleStage = null;
var renderers = null;

var recipeRotor = null;

var blur = null;
var blurX = null;
var blurY = null;
var thresoldFilter = null;
var custom = null;


function CocktailRenderer() {
    width = $("#cocktailRenderer").width();
    height = $("#cocktailRenderer").height();

    /* Create World */
    world = new b2World(new b2Vec2(0, 10));

    /* Parser Init */
    parser = new Parser();
    parser.initParser();

    collisionManager = new CollisionManager();
    shapeManager = new ShapeManager();

    /* Graphics Init */
    stage = new PIXI.Container();
    particleStage = new PIXI.Container();
    stage.addChild(particleStage);
    /* - Filter */
    blur = new PIXI.filters.BlurFilter();
    custom = new PIXI.filters.NoiseFilter();

    blur.blur=300;
    blur.passes =1;

    thresoldFilter = new TresholdFilter();


}

CocktailRenderer.prototype.initRenderer = function () {
    renderers = PIXI.autoDetectRenderer(width, height, { transparent: true }, true);  // arguments: width, height, view, transparent, antialias
    $("#cocktailRenderer").append(renderers.view);


    world.SetGravity(new b2Vec2(0, 10));
    var bd = new b2BodyDef;
    g_groundBody = world.CreateBody(bd);

    animationManager = AnimationManager();
    requestAnimationFrame(animate);
}

CocktailRenderer.prototype.reload = function (ingredients, recipe_id) {
    resetTimeline();

    delete stage;
    delete particleStage;
    stage = new PIXI.Container();
    particleStage = new PIXI.Container();
    particleStage.interactive = true;
    stage.addChild(particleStage);

    thresoldFilter = new TresholdFilter();
    particleStage.filters = [blur];

    world.DestroyParticleSystem(world.particleSystems[0]);
    /* Create World */
    gravity = new b2Vec2(0, 8);
    world = new b2World(gravity);

    circleIndex = [];
    recipeArr = [];
    edgeArr = [];
    shapeArr = [];
    circleArr = [];
    rotorArr = [];

    if (recipe_id != null)
        currentRecipe = recipe_id;
    else
        currentRecipe = null;
    currentIngredients = ingredients;
    this.LoadAnimation("AnimationManager");
}



CocktailRenderer.prototype.LoadAnimation = function (animationName) {
    var bd = new b2BodyDef;
    g_groundBody = world.CreateBody(bd);

    var animationManager = new window[animationName];
}