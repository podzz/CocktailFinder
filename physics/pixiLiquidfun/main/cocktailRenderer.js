/**
 * Created by Francois on 31/03/15.
 */

var circleArr = [];
var shapeArr = [];
var edgeArr = [];
var recipeArr = [];
var objectDisplayArr = [];
var objectPhysicsArr = [];
var shapeArrInc = 0;
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

var reloadTime = 0;

var OFFSET_X = 0;
var OFFSET_Y = 0;

var _len = 0;

var endtime = 0;

var width = 0;
var height = 0;

var world = null;
var parser = null;

var stage = null;
var pondContainer = null;
var renderers = null;

var blurFilter = null;
var thresoldFilter = null;


function CocktailRenderer() {
    width = $("#cocktailRenderer").width();
    height = $("#cocktailRenderer").height();

    /* Create World */
    gravity = new b2Vec2(0, 10)
    world = new b2World(gravity);

    /* Parser Init */
    parser = new Parser();
    parser.initParser();

    /* Graphics Init */
    stage = new PIXI.Stage(displayFillColor);
    pondContainer = new PIXI.DisplayObjectContainer();
    stage.addChild(pondContainer);

    /* - Filter */
    blurFilter = new PIXI.BlurFilter();
    thresoldFilter = new PIXI.TresholdFilter();
    blurFilter.blur = 20;
    pondContainer.filters = [blurFilter, thresoldFilter];

    /* Init renderer */

}

CocktailRenderer.prototype.initRenderer = function () {
    renderers = PIXI.autoDetectRenderer(width, height, null, true, true);  // arguments: width, height, view, transparent, antialias
    $("#cocktailRenderer").append(renderers.view);
    LoadAnimation("MixColor");
    _len = world.particleSystems[0].GetPositionBuffer().length / 2;

    for (var i = 0; i < _len; i++) {

        var graphics = new PIXI.Graphics();
        stage.addChild(graphics);
        circleArr.push(graphics);
        pondContainer.addChild(graphics);
    }
    requestAnimFrame(animate);
}

CocktailRenderer.prototype.reload = function (glass) {
    pondContainer.visible = false;
    delete pondContainer;
    delete stage;
    stage = new PIXI.Stage(displayFillColor);
    pondContainer = new PIXI.DisplayObjectContainer();
    stage.addChild(pondContainer);
    pondContainer.filters = [blurFilter, thresoldFilter];

    var gravity = new b2Vec2(0, 10);
    world = new b2World(gravity);


    LoadAnimation("MixColor");

    _len = world.particleSystems[0].GetPositionBuffer().length / 2;
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

    var alphaBuffer = [];

    for (var i = 3; i < colorsBuffer.length; i += 4) {
        alphaBuffer[(i - 3) / 4] = colorsBuffer[i];
    }

    for (var i = 0; i < circleArr.length; i++) {
        circleArr[i].x = ((particles[i * 2] ) * METER + OFFSET_X);
        circleArr[i].y = ((particles[(i * 2) + 1]) * METER + OFFSET_Y);

        circleArr[i].clear();
        circleArr[i].beginFill(rgbToHex(colorsBuffer[i * 4], colorsBuffer[(i * 4) + 1], colorsBuffer[(i * 4) + 2]));
        circleArr[i].drawCircle(0 - particleSize / METER / 2, 0 - particleSize / METER / 2, particleSize);
    }


    for (var i = 0; i < objectArrInc; i++) {
        var currentPosition = objectPhysicsArr[i].GetWorldCenter();
        var currentAngle = objectPhysicsArr[i].GetAngle();

        objectDisplayArr[i].position.x = currentPosition.x * METER;
        objectDisplayArr[i].position.y = currentPosition.y * METER;
        objectDisplayArr[i].rotation = currentAngle;
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
    recipeArr = [];
    edgeArr = [];
    var bdDef = new b2BodyDef();
    var body = world.CreateBody(bdDef);
    parser.getParseResult(Math.floor(Math.random() * 12) + 0);
    getEdges(body, edgeArr);
    linkShape(body, recipeArr);
    getAllParticle();
    //createIceCube(0, 0, 0.2);  // Xoffset, Yoffset, size; The offset is about the center of the screen
    createIceCube(0, 1, 0.2);
    createCitron(0.1,-2.4,0.4);
    //createPaille(0,0, 1);
    recipeRender(recipeArr);
}

MixColor.prototype.Step = function () {
    world.Step(timeStep, velocityIterations, positionIterations);
    this.time += 1 / 60;
}