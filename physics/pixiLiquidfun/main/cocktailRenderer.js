/**
 * Created by Francois on 31/03/15.
 */

var circleArr = [];
var shapeArr = [];
var shapeArrInc = 0;
var world = null;

var blurFilter;
var thresoldFilter;

var right;
var left;
var renderers;
var stage;
var pondContainer;
var timeStep = 1.0 / 60.0;
var particleSystem;
var velocityIterations = 3;
var positionIterations = 3;
var g_groundBody = null;
var test;

var particleSize = 8.5;

var METER = 100; //Meter per pixel

var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;

var OFFSET_X = 0;
var OFFSET_Y = 0;

var _len = 0;

function onload() {
    var gravity = new b2Vec2(0, 10);
    world = new b2World(gravity);


    /** EXPLICATION
     * La fonction "init();" est appelé via parser.running car le chargement du JSON se fait de manière
     * asynchrone. Le problème étant que l'init a besoin des données du JSON *avant* de se lancer
     * pour générer les formes et les collisions. Si aucun JSON n'est à appeler, il suffit de
     * décommenter "init();" et commenter "getAndParseJSONFile();"
     */
    //init();
    getAndParseJSONFile();

}

function reload() {

    LoadAnimation("MixColor");

    pondContainer.visible = false;
    delete pondContainer;

    pondContainer = new PIXI.DisplayObjectContainer();
    stage.addChild(pondContainer);
    pondContainer.filters = [blurFilter, thresoldFilter];


    shapeRender();

    _len = world.particleSystems[world.particleSystems.length - 1].GetPositionBuffer().length / 2;
    for (var i = 0; i < _len; i++) {
        pondContainer.addChild(circleArr[i]);
    }
}

function LoadAnimation(animationName) {
    world.SetGravity(new b2Vec2(0, 10));
    var bd = new b2BodyDef;
    g_groundBody = world.CreateBody(bd);

    test = new window[animationName];
}

function init() {
    // Init Pixi

    windowWidth = $("#cocktailRenderer").width();
    windowHeight = $("#cocktailRenderer").height();
    stage = new PIXI.Stage(0xFFFFFF);
    pondContainer = new PIXI.DisplayObjectContainer();
    stage.addChild(pondContainer);

    //Filter
    blurFilter = new PIXI.BlurFilter();
    blurFilter.blur = 20;
    thresoldFilter = new PIXI.TresholdFilter();
    pondContainer.filters = [ blurFilter, thresoldFilter];

    // Init renderer
    renderers = PIXI.autoDetectRenderer(windowWidth, windowHeight, null, true, true);  // arguments: width, height, view, transparent, antialias
    $("#cocktailRenderer").append(renderers.view);

    var that = this;
    LoadAnimation("MixColor");

    // "shapeRender();" --> Render all shape except particles and object
    shapeRender();


    _len = world.particleSystems[0].GetPositionBuffer().length / 2;

    for (var i = 0; i < _len; i++) {

        var graphics = new PIXI.Graphics();
        stage.addChild(graphics);
        circleArr.push(graphics);
        pondContainer.addChild(graphics);
    }

    requestAnimFrame(animate);
}

function componentToHex(c) {
    var hex = c.toString(16).toUpperCase();
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "0x" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function animate() {
    test.Step();

    requestAnimFrame(animate);

    var particles = world.particleSystems[0].GetPositionBuffer();
    var colorsBuffer = world.particleSystems[0].GetColorBuffer();

    for (var i = 0; i < circleArr.length; i++) {
        circleArr[i].x = particles[i * 2] * METER + OFFSET_X;
        circleArr[i].y = particles[(i * 2) + 1] * METER + OFFSET_Y;

        circleArr[i].clear();
        circleArr[i].beginFill(rgbToHex(colorsBuffer[i * 4], colorsBuffer[(i * 4) + 1],colorsBuffer[(i * 4) + 2]));
        circleArr[i].drawCircle(0,0, particleSize);
    }
    renderers.render(stage);
}

/**@constructor*/
function QueryCallback(point) {
    this.point = point;
}

/**@return bool*/
QueryCallback.prototype.ReportFixture = function (fixture) {
    var body = fixture.body;
    if (body.GetType() === b2_dynamicBody) {
        var inside = fixture.TestPoint(this.point);
        if (inside) {
            return true;
        }
    }
    return false;
};

function MixColor() {
    var bdDef = new b2BodyDef();
    var bobo = world.CreateBody(bdDef);
    getAllShape(bobo, shapeArr, shapeArrInc);
    getAllParticle();
}

MixColor.prototype.Step = function () {
    world.Step(timeStep, velocityIterations, positionIterations);
    this.time += 1 / 60;
}