/**
 * Created by Francois on 31/03/15.
 */

var circleArr = [];
var world = null;
var renderer;
var blurFilter;
var right;
var left;
var renderers;
var stage;
var pondContainer;
var timeStep = 1.0 / 60.0;
var velocityIterations = 8;
var positionIterations = 3;
var g_groundBody = null;
var test;

var METER = 100; //Meter per pixel

var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;

var OFFSET_X = 0;
var OFFSET_Y = 0;

var _len = 0;

console.log("windowWidth : " + windowWidth + "px / " + windowWidth / METER + "m");
console.log("windowHeight : " + windowHeight + "px / " + windowHeight / METER + "m");

function onload() {

    // hack
    //renderer = new Renderer();
    var gravity = new b2Vec2(0, 12);
    world = new b2World(gravity);
    init();
}

function testSwitch(testName) {
    world.SetGravity(new b2Vec2(0, 10));
    var bd = new b2BodyDef;
    g_groundBody = world.CreateBody(bd);
    test = new window[testName];
}

function init(obj) {



    /*Initialize PIXI World*/
    // create an new instance of a pixi stage
    stage = new PIXI.Stage(0xFFFFFF);
    pondContainer = new PIXI.DisplayObjectContainer();
    stage.addChild(pondContainer);

    //Filter
    blurFilter = new PIXI.BlurFilter();
    blurFilter.blur = 10;

    var thresoldfilter = new PIXI.TresholdFilter();

    pondContainer.filters = [blurFilter, thresoldfilter];

    // create a renderer instance

    renderers = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight);  // arguments: width, height, view, transparent, antialias
    // add the renderer view element to the DOM
    document.body.appendChild(renderers.view);

    // Init world
    //GenerateOffsets();
    //Init
    var that = this;
    testSwitch("TestWaveMachine");


    _len = world.particleSystems[0].GetPositionBuffer().length / 2;

    for (var i = 0; i < _len; i++) {

        var graphics = new PIXI.Graphics();
        graphics.beginFill(0x00b8ff);
        graphics.drawCircle(0,0,10,10);

        stage.addChild(graphics);
        circleArr.push(graphics);
        pondContainer.addChild(graphics);
    }
    ;

    //for pixi
    requestAnimFrame(animate);
}

function animate() {
    if (test.Step !== undefined) {
        test.Step();
    } else {
        Step();
    }

    var particles = world.particleSystems[0].GetPositionBuffer();
    var colorsBuffer = world.particleSystems[0].GetColorBuffer();

    for (var i = 0; i < circleArr.length; i++) {
        var posX = particles[i * 2] * METER + OFFSET_X;
        var posY = particles[(i * 2) + 1] * METER + OFFSET_Y;


        circleArr[i].x = posX;
        circleArr[i].y = posY;
            }

    requestAnimFrame(animate);

    // render the stage
    renderers.render(stage);
}

var Step = function () {
    world.Step(timeStep, velocityIterations, positionIterations);
};

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

function TestWaveMachine() {

    //world Ground

    var bdDef = new b2BodyDef();
    var bobo = world.CreateBody(bdDef);

    //ground
    var wg = new b2PolygonShape();
    console.log(windowHeight / METER);
    wg.SetAsBoxXYCenterAngle(windowWidth / METER / 2.0, 0.05, new b2Vec2(windowWidth / METER / 2, 8), 0);
    bobo.CreateFixtureFromShape(wg, 5);

    //left wall
    var wgl = new b2PolygonShape();
    wgl.SetAsBoxXYCenterAngle(0.05, windowHeight / METER / 2, new b2Vec2(-0.05, windowHeight / METER / 2), 0);
    bobo.CreateFixtureFromShape(wgl, 5);

    //right wall
    var wgr = new b2PolygonShape();
    wgr.SetAsBoxXYCenterAngle(0.05, windowHeight / METER / 2, new b2Vec2(windowWidth / METER + 0.05, windowHeight / METER / 2), 0);
    bobo.CreateFixtureFromShape(wgr, 5);

    // setup particles
    var psd = new b2ParticleSystemDef();
    psd.radius = 0.05;
    psd.dampingStrength = 0.2;
    psd.flags = b2_colorMixingParticle;

    var particleSystem = world.CreateParticleSystem(psd);
    var box = new b2PolygonShape();
    box.SetAsBoxXYCenterAngle(1.8, 2, new b2Vec2(windowWidth / 2 / METER, -windowHeight / 4 / METER), 0);

    var particleGroupDef = new b2ParticleGroupDef();
    particleGroupDef.shape = box;
    particleGroupDef.flags = b2_colorMixingParticle;
    particleGroupDef.color.Set(0,0,255,255);

    var particleGroupDef2 = new b2ParticleGroupDef();
    particleGroupDef2.shape = box;
    particleGroupDef2.flags = b2_colorMixingParticle;
    particleGroupDef2.color.Set(127,0,255,255);

    var particleGroup = particleSystem.CreateParticleGroup(particleGroupDef);

    var particleGroup2 = particleSystem.CreateParticleGroup(particleGroupDef2);

}

TestWaveMachine.prototype.Step = function () {
    world.Step(timeStep, velocityIterations, positionIterations);
    this.time += 1 / 60;
//  this.joint.SetMotorSpeed(0.35 * Math.cos(this.time) * Math.PI);
}

function getRandomRange(min, max) {
    return Math.random() * (max - min) + min;
}