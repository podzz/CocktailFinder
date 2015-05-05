/**
 * Created by Francois on 31/03/15.
 */

var circleArr = [];
var circleIndex = [];
var dictionnary = {};
var shapeArr = [];
var edgeArr = [];
var recipeArr = [];
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

var stage = null;
var pondContainer = null;
var renderers = null;

var blurFilter = null;
var thresoldFilter = null;

var animated = false;


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
    blurFilter.blur = 10;
    pondContainer.filters = [blurFilter, thresoldFilter];

    /* Init renderer */

}

CocktailRenderer.prototype.initRenderer = function () {
    renderers = PIXI.autoDetectRenderer(width, height, null, true, true);  // arguments: width, height, view, transparent, antialias
    $("#cocktailRenderer").append(renderers.view);
    animated = true;
    LoadAnimation("MixColor");
    // world.particleSystems[0].destroyByAge = true;
    // world.particleSystems[0]
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
    //world.particleSystems[0].destroyByAge = true;
    /* Create World */
    gravity = new b2Vec2(0, 10)
    world = new b2World(gravity);

    circleIndex = [];
    recipeArr = [];
    edgeArr = [];
    shapeArr = [];
    circleArr = [];

    LoadAnimation("MixColor");
}

function LoadAnimation(animationName) {
    world.SetGravity(new b2Vec2(0, 10));
    var bd = new b2BodyDef;
    g_groundBody = world.CreateBody(bd);

    test = new window[animationName];
}


function animate() {
    function componentToHex(c) {
        var hex = c.toString(16).toUpperCase();
        return hex.length == 1 ? "0" + hex : hex;
    }

    function rgbToHex(r, g, b) {
        return "0x" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    }

    test.Step();

    requestAnimFrame(animate);
    var particles = world.particleSystems[world.particleSystems.length - 1].GetPositionBuffer();
    var colorsBuffer = world.particleSystems[world.particleSystems.length - 1].GetColorBuffer();

    var dropable_index = [];
    for (var key in circleIndex) {
        var index = circleIndex[key];
        var circle = circleArr[index];
        if (circle.y < height) {
            circle.x = ((particles[index * 2] ) * METER + OFFSET_X);
            circle.y = ((particles[(index * 2) + 1]) * METER + OFFSET_Y);
            circle.clear();
            circle.beginFill(rgbToHex(colorsBuffer[index * 4], colorsBuffer[(index * 4) + 1], colorsBuffer[(index * 4) + 2]));
            circle.drawCircle(0 - particleSize / METER / 2, 0 - particleSize / METER / 2, particleSize);
        }
        else {
            circle.clear();
            dropable_index.push(circleIndex[key]);
        }
    }

    if (dropable_index.length > 20) {
        for (var key in dropable_index) {
            var index = circleIndex.indexOf(dropable_index[key]);
            if (index > -1) {
                circleIndex.splice(index, 1);
            }
            else {
                console.log('not found');
            }
        }
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

    var bdDef = new b2BodyDef();
    var body = world.CreateBody(bdDef);
    initParticle();
    parser.getParseResult(Math.floor(Math.random() * 12) + 1);
    getEdges(body, edgeArr);
    edgerender(edgeArr);
    linkShape(body, recipeArr);
    recipeRender(recipeArr);
    //addColorGroup(1000, 0.1, 0.8);
    //resetTimeline();
    //addColorGroup(1000, 0.1, 0.8);
    //addColorGroup(5000, 0.1, 0.8);
    //addFlowBottle(100, 2, 0.06);
    //var bottle1 = setTimeout(function() { addFlowBottle(100, 2, 0.06);}, 5000);
    //var bottle2 = setTimeout(function() { addFlowBottle(100, 2, 0.06);}, 10000);

    //eventArray.push(bottle1);
    //eventArray.push(bottle2);
    //addFlowBottle(50, 2, 0.04);
    //addColorGroup(10000, 0.1, 0.8);
    //addColorGroup(15000, 0.1, 0.8);
    //addColorGroup(20000, 0.1, 0.8);
    //addColorGroup(25000, 0.1, 0.8);
    //addColorGroup(30000, 0.1, 0.8);
    //addColorGroup(3000);
    //addColorGroup(5000);
    //createIceCube(0, 0, 0.2);  // Xoffset, Yoffset, size; The offset is about the center of the screen
    //setInterval(function() {createIceCube(0, -3, 0.4);}, 4000);
    //setInterval(function() {createCitron(0.1, -2.4, 0.6);}, 1000);
    //createBanner(0,0, 1);
    //createPaille(0,0, 1);
    //resetTimeline();

}

MixColor.prototype.Step = function () {
    world.Step(timeStep, velocityIterations, positionIterations);
    this.time += 1 / 60;
}