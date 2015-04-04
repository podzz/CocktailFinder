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
var OFFSET_Y = 0 ;

console.log("windowWidth : "+windowWidth + "px / "+windowWidth/METER + "m");
console.log("windowHeight : "+windowHeight + "px / "+windowHeight/METER + "m");

function onload() {

    // hack
    //renderer = new Renderer();
    var gravity = new b2Vec2(0, 10);
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
    blurFilter.blur =5;
    //pondContainer.filters = [blurFilter];

    // create a renderer instance

    renderers = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight);  // arguments: width, height, view, transparent, antialias
    // add the renderer view element to the DOM
    document.body.appendChild(renderers.view);

    // Init world
    //GenerateOffsets();
    //Init
    var that = this;
    testSwitch("TestWaveMachine");


    var _len = world.particleSystems[0].GetPositionBuffer().length / 2;

    //ballTexture.filters = [blurFilter];

    var swi = 0;

    for (var i = 0; i < _len; i++) {

        var graphics = new PIXI.Graphics();
        if (swi == 0) {
            //graphics.lineStyle (2 , 0x000000,  1);
            graphics.beginFill(0x00b8ff);
            graphics.drawCircle(0, 300, 5);
            //graphics.alpha = 0.5;
            swi = 1;
        } else {
            //graphics.lineStyle (2 , 0x000000,  1);
            graphics.beginFill(0x00b8ff);
            graphics.drawCircle(0, 300, 5);
            //graphics.alpha = 0.5;
            swi = 0;
        }

        //画像の方が圧倒的に早い！！

        //var tempBall = new PIXI.Sprite.fromImage("http://jsrun.it/assets/t/D/W/b/tDWbo.png");
        /*var tempBall = new PIXI.Sprite.fromImage("http://staticvp.com/1907-2183-small/transparent-dark-blue-acrylic-cracked-orb-piercing-ball.jpg");
         var tempBallsecond = new PIXI.Sprite.fromImage("http://staticvp.com/1904-2181-small/transparent-orange-acrylic-cracked-orb-piercing-ball.jpg");

         //      var tempBall = new PIXI.Sprite(ballTexture);
         //      tempBall.position.x = 600;
         //      tempBall.position.y = 600;
         tempBall.anchor.x = 0.5;
         tempBall.anchor.y = 0.5;
         tempBall.alpha = 0.5;
         if (swi == 0) {
         circleArr.push(tempBall);
         pondContainer.addChild(tempBall);
         swi = 1;
         } else {
         circleArr.push(tempBallsecond);
         pondContainer.addChild(tempBallsecond);
         swi = 0;
         }*/

        stage.addChild(graphics);
        circleArr.push(graphics);
        pondContainer.addChild(graphics);
    };

    //for pixi
    requestAnimFrame(animate);
}

function animate() {
    if (test.Step !== undefined) {
        test.Step();
    } else {
        Step();
    }
//    gj.position.x = bbdd.fixtures[0].body.GetTransform().q.s*100;
//    gj.position.y = bbdd.fixtures[0].body.GetTransform().q.c*100;

//    console.log(bbdd.fixtures[0].body.GetAngle());
//    console.log(bbdd.fixtures[2].body.GetTransform());
    var particles = world.particleSystems[0].GetPositionBuffer();

    for (var i = 0; i < circleArr.length; i++) {
        circleArr[i].x = particles[i*2]*METER+OFFSET_X;
        circleArr[i].y = particles[(i*2)+1]*METER+OFFSET_Y;
    };
//    gj.filters = [blurFilter];
    requestAnimFrame(animate);

    // render the stage
    renderers.render(stage);
}

var Step = function() {
    world.Step(timeStep, velocityIterations, positionIterations);
};

/**@constructor*/
function QueryCallback(point) {
    this.point = point;
    this.fixture = null;
}

/**@return bool*/
QueryCallback.prototype.ReportFixture = function(fixture) {
    var body = fixture.body;
    if (body.GetType() === b2_dynamicBody) {
        var inside = fixture.TestPoint(this.point);
        if (inside) {
            this.fixture = fixture;
            return true;
        }
    }
    return false;
};

function getMouseCoords(event) {
    var p = new b2Vec2(((event.clientX) / METER ), ((event.clientY) / METER  ));
//  console.log(p);
    return p;
}

function TestWaveMachine() {

    //world Ground

    var bdDef = new b2BodyDef();
    var bobo = world.CreateBody(bdDef);

    //ground
    var wg = new b2PolygonShape();
//  console.log(windowHeight/METER);
    console.log(windowHeight/METER);
    wg.SetAsBoxXYCenterAngle(windowWidth/METER/2.0,0.05,new b2Vec2(windowWidth/METER/2,4.2),0);
    bobo.CreateFixtureFromShape(wg, 5);

    //left wall
    var wgl = new b2PolygonShape();
    wgl.SetAsBoxXYCenterAngle(0.05,windowHeight/METER/2,new b2Vec2(-0.05,windowHeight/METER/2),0);
    bobo.CreateFixtureFromShape(wgl, 5);

    //right wall
    var wgr = new b2PolygonShape();
    wgr.SetAsBoxXYCenterAngle(0.05,windowHeight/METER/2,new b2Vec2(windowWidth/METER+0.05,windowHeight/METER/2),0);
    bobo.CreateFixtureFromShape(wgr, 5);
    /*
     var bdDynDef = new b2BodyDef();
     bdDynDef.type = b2_dynamicBody;
     bdDynDef.allowSleep = false;
     hoge = world.CreateBody(bdDynDef);

     var cube = new b2PolygonShape();
     cube.SetAsBoxXYCenterAngle(100/2/METER,100/2/METER,new b2Vec2(windowWidth/2/METER,-5),0);
     hoge.CreateFixtureFromShape(cube, 5);

     var bdDynDef0 = new b2BodyDef();
     bdDynDef0.type = b2_dynamicBody;
     hoge0 = world.CreateBody(bdDynDef0);

     var spear = new b2PolygonShape();
     spear.SetAsBoxXYCenterAngle(100/2/METER,100/2/METER,new b2Vec2(windowWidth/4/METER,-20),0);
     hoge0.CreateFixtureFromShape(spear, 3);
     */
    /*
     var naname = new b2PolygonShape();
     naname.SetAsBoxXYCenterAngle(20/2/METER,200/2/METER,new b2Vec2((windowWidth/2)/METER,(863-200)/METER), -45* Math.PI /180.1);
     bobo.CreateFixtureFromShape(naname, 5);
     */
    // setup particles
    var psd = new b2ParticleSystemDef();
    psd.radius = 0.05;
    psd.dampingStrength = 0.2;
    //psd.SetGroupFlags(b2_colorMixingParticle);

    var particleSystem = world.CreateParticleSystem(psd);
    var box = new b2PolygonShape();
    box.SetAsBoxXYCenterAngle(1.4   , 2, new b2Vec2(windowWidth/2/METER, -windowHeight/4/METER), 0);

    var particleGroupDef = new b2ParticleGroupDef();
    particleGroupDef.shape = box;
    particleGroupDef.flags = b2_colorMixingParticle | b2_barrierParticle;

    var particleGroup = particleSystem.CreateParticleGroup(particleGroupDef);

    //b2_colorMixingParticle

}

TestWaveMachine.prototype.Step = function() {
    world.Step(timeStep, velocityIterations, positionIterations);
    this.time += 1 / 60;
//  this.joint.SetMotorSpeed(0.35 * Math.cos(this.time) * Math.PI);
}

function getRandomRange(min, max) {
    return Math.random() * (max - min) + min;
}