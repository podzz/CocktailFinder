/// <reference path="lib/liquidfun.d.ts"/>
/// <reference path="lib/pixi.d.ts"/>
/// <reference path="Parser.ts"/>
/// <reference path="Shape.ts"/>
/// <reference path="Collision.ts"/>
/// <reference path="Graphics.ts"/>
/// <reference path="Recipe.ts"/>
/// <reference path="Particle.ts"/>
/// <reference path="Tools.ts"/>


/*
 document.addEventListener('mousedown', function (event) {
 var width = $("#cocktailRenderer").width();
 var height = $("#cocktailRenderer").height();
 var mouse = {x: (event.clientX - width) / METER , y:(event.clientY) / METER};
 var p = new b2Vec2(mouse.x, mouse.y);
 var aabb = new b2AABB();
 var d = new b2Vec2();

 d.Set(0.01, 0.01);
 b2Vec2.Sub(aabb.lowerBound, p, d);
 b2Vec2.Add(aabb.upperBound, p, d);

 var queryCallback = new QueryCallback(p)
 world.QueryAABB(queryCallback, aabb);

 if (queryCallback.fixture) {
 var body_query = queryCallback.fixture.body;
 var md = new b2MouseJointDef();
 md.bodyA = body;
 md.bodyB = body_query;
 md.target = p;
 md.maxForce = 1000;
 that.mouseJoint = world.CreateJoint(md);
 body_query.SetAwake(true);
 }
 });

 document.addEventListener('mousemove', function(event) {
 var width = $("#cocktailRenderer").width();
 var height = $("#cocktailRenderer").height();
 var mouse = {x: (event.clientX - width) / METER , y:(event.clientY) / METER};
 var p = new b2Vec2(mouse.x, mouse.y);
 if (that.mouseJoint) {
 that.mouseJoint.SetTarget(p);
 }
 });

 document.addEventListener('mouseup', function(event) {
 if (that.mouseJoint) {
 world.DestroyJoint(that.mouseJoint);
 that.mouseJoint = null;
 }
 });


 }

 function QueryCallback(point) {
 this.point = point;
 this.fixture = null;
 }

 QueryCallback.prototype.ReportFixture = function (fixture) {
 var body = fixture.body;
 if (body.GetType() == b2_dynamicBody) {
 var inside = fixture.TestPoint(this.point);
 if (inside) {
 this.fixture = fixture;
 return true;
 }
 }
 return false;
 };*/

class Animation {
    width:number;
    height:number;
    METER:number;

    private world:b2World;
    private parser:Parser;
    private shape:Shape;
    private collision:Collision;
    private graphics:Graphics;
    private recipe:Recipe;
    private particle:Particle;
    private tools:Tools;
    private timeline:Timeline;

    private recipeId:number = 0;

    private timeStep:number = 1.0 / 60.0;
    private velocityIterations:number = 3;
    private positionIterations:number = 3;
    private time:number = 0;

    constructor(width:number, height:number, METER:number, managers:any) {
        this.width = width;
        this.height = height;
        this.METER = METER;
        this.world = new b2World(new b2Vec2(0, 10));

        this.parser = managers['parser'];
        this.shape = managers['shape'];
        this.collision = managers['collision'];
        this.graphics = managers['graphics'];
        this.recipe = managers['recipe'];
        this.particle = new Particle(width, height, METER);
        this.tools = managers['tools'];
        this.timeline = managers['timeline'];
    }

    private WorldReset() {
        this.timeline.resetTimeline();
        if (this.world != null) {
            for (var system in this.world.particleSystems) {
                this.world.DestroyParticleSystem(system);
            }
            for (var body in this.world.bodies) {
                this.world.DestroyBody(body);
            }
        }
        var psd = new b2ParticleSystemDef();
        psd.radius = 0.05;
        psd.dampingStrength = 0.4;
        psd.viscousStrength = 0.05;
        //psd.colorMixingStrength = 0.8;
        psd.colorMixingStrength = 0.01;
        this.world.CreateParticleSystem(psd);
    }

    public Load(ingredients:any, recipe_id:number) {
        this.WorldReset();

        var bdDef:b2BodyDef = new b2BodyDef();
        var body:b2Body = this.world.CreateBody(bdDef);

        var rotorDef:b2BodyDef = new b2BodyDef();
        var rotorBody:b2Body = this.world.CreateBody(rotorDef);
        rotorBody.SetType(b2_staticBody);
        //rotorBody.SetFixedRotation(true);

        var recipe:number = ((this.recipeId == 0) ? Math.floor(Math.random() * 12) + 1 : this.recipeId);
        var rotorArr:b2Vec2[][] = this.parser.getRotor();
        var recipeArr:b2Vec2[][] = this.parser.getRecipe(recipe);


        //shapeManager.LoadGround(body, recipeArr);
        //shapeManager.LoadStartLiquid(rotorBody, rotorDef, rotorArr);

        this.collision.LinkShape(body, recipeArr);
        this.collision.LinkShape(rotorBody, rotorArr);

        this.graphics.RenderRecipe(this.parser.getRecipeImagePath(recipe_id));

        //rotorRender(rotorArr);
        var distributions = this.recipe.generateDistribution(ingredients);
        for (var distribution in distributions) {
            this.particle.addFlowBottle(distribution.pop, distribution.color, distribution.opacity, distribution.quantity);
        }
    }

    private step() {
        this.world.Step(this.timeStep, this.velocityIterations, this.positionIterations);
        this.time += 1 / 60;
    }

    public animate() {
        this.step();

        var particles = this.world.particleSystems[this.world.particleSystems.length - 1].GetPositionBuffer();
        var colorsBuffer = this.world.particleSystems[this.world.particleSystems.length - 1].GetColorBuffer();

        var dropable_index = [];
        for (var key in circleIndex) {
            var index = circleIndex[key];
            var circle = circleArr[index];
            if (circle.y < this.height) {
                circle.position.x = ((particles[index * 2] ) * this.METER);
                circle.position.y = ((particles[(index * 2) + 1]) * this.METER);
                circle.clear();

                circle.beginFill(this.tools.rgbToHex(colorsBuffer[index * 4], colorsBuffer[(index * 4) + 1], colorsBuffer[(index * 4) + 2]), colorsBuffer[(index * 4) + 3] / 255);
                circle.drawCircle(0, 0, particleSize);
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
            }
        }
        /*

         for (var i = 0; i < objectArrInc; i++) {
         var currentPosition = objectPhysicsArr[i].GetWorldCenter();
         var currentAngle = objectPhysicsArr[i].GetAngle();

         objectDisplayArr[i].position.x = currentPosition.x * this.METER;
         objectDisplayArr[i].position.y = currentPosition.y * this.METER;
         objectDisplayArr[i].rotation = currentAngle;
         }*/
        renderers.render(stage);


        requestAnimationFrame(animate);

    }
}