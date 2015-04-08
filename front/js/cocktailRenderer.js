/**
 * Created by Francois on 31/03/15.
 */

var circleArr = [];
var world = null;

var blurFilter;
var thresoldFilter;
var displacementFilter;

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

var color1 = { r: 0, g:0, b:0, a:0};
var color2 = { r: 0, g:0, b:0, a:0};

function setParticleColorGroup(firstColor, secondColor) {
    color1 = firstColor;
    color2 = secondColor;
}

function reloadRenderer() {
    LoadAnimation("MixColor");

    pondContainer.visible = false;
    delete pondContainer;

    pondContainer = new PIXI.DisplayObjectContainer();
    stage.addChild(pondContainer);
    pondContainer.filters = [blurFilter, thresoldFilter];

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

function initRenderer() {
    // Init Pixi
    var gravity = new b2Vec2(0, 10);
    world = new b2World(gravity);

    windowWidth = $("#cocktailList").width() / 2;
    //windowHeight = $("#cocktailList").height();
    windowHeight = 300;
    stage = new PIXI.Stage(0x000000);
    pondContainer = new PIXI.DisplayObjectContainer();
    stage.addChild(pondContainer);

    //Filter
    blurFilter = new PIXI.BlurFilter();
    blurFilter.blur = 20;
    thresoldFilter = new PIXI.TresholdFilter();

    //displacementFilter = new PIXI.GrayFilter();
    pondContainer.filters = [ blurFilter, thresoldFilter];

    // Init renderer
    renderers = PIXI.autoDetectRenderer(windowWidth, windowHeight, {transparent:true});  // arguments: width, height, view, transparent, antialias
    $("#cocktailRenderer").append(renderers.view);
    LoadAnimation("MixColor");

    _len = world.particleSystems[0].GetPositionBuffer().length / 2;

    for (var i = 0; i < _len; i++) {

        var graphics = new PIXI.Graphics();
        stage.addChild(graphics);
        circleArr.push(graphics);
        pondContainer.addChild(graphics);
    }
    pondContainer.visible = false;
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
        circleArr[i].lineColor = 0xFF00FF;
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

    var wg = new b2PolygonShape();
    wg.SetAsBoxXYCenterAngle(windowWidth / METER, 0.05, new b2Vec2(windowWidth / METER / 2, windowHeight / METER), 0);
    bobo.CreateFixtureFromShape(wg, 1);

    //left wall
    var wgl = new b2PolygonShape();
    wgl.SetAsBoxXYCenterAngle(0.05, windowHeight / METER, new b2Vec2(0, windowHeight / METER), 0);
    bobo.CreateFixtureFromShape(wgl, 1);

    //right wall
    var wgr = new b2PolygonShape();
    wgr.SetAsBoxXYCenterAngle(0.05, windowHeight / METER, new b2Vec2(windowWidth / METER - 0.05, windowHeight / METER), 0);
    bobo.CreateFixtureFromShape(wgr, 1);


    // setup particles
    var psd = new b2ParticleSystemDef();
    psd.radius = 0.08;
    psd.dampingStrength = 0.4;

    if (particleSystem != null)
        world.DestroyParticleSystem(particleSystem);
    particleSystem = world.CreateParticleSystem(psd);

    var box2 = new b2PolygonShape();
    box2.SetAsBoxXYCenterAngle(0.1, 3, new b2Vec2(0.5, 2), 0);

    var particleGroupDef2 = new b2ParticleGroupDef();
    particleGroupDef2.shape = box2;
    particleGroupDef2.flags = b2_colorMixingParticle;
    // vodka
    //particleGroupDef2.color.Set(255,255,255,255);

    // coca
    //particleGroupDef2.color.Set(51, 11, 12, 180);

    // custom
    particleGroupDef2.color.Set(color1.r, color1.g, color1.b, color1.a);

    var box3 = new b2PolygonShape();
    box3.SetAsBoxXYCenterAngle(0.1, 3, new b2Vec2(windowWidth / METER - 0.5, 2), 0);

    var particleGroupDef3 = new b2ParticleGroupDef();
    particleGroupDef3.shape = box3;
    particleGroupDef3.flags = b2_colorMixingParticle;
    // orange
    //particleGroupDef3.color.Set(255,153,0,255);
    // whisky
    //particleGroupDef3.color.Set(211, 164, 110, 255);
    // custom
    particleGroupDef3.color.Set(color2.r, color2.g, color2.b, color2.a);

    var particleGroup2 = particleSystem.CreateParticleGroup(particleGroupDef2);
    var particleGroup3 = particleSystem.CreateParticleGroup(particleGroupDef3);
}

MixColor.prototype.Step = function () {
    world.Step(timeStep, velocityIterations, positionIterations);
    this.time += 1 / 60;
}