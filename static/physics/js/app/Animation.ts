/// <reference path="../lib/liquidfun.d.ts"/>
/// <reference path="../lib/pixi.d.ts"/>
/// <reference path="Parser.ts"/>
/// <reference path="Shape.ts"/>

class Animation {
    width:number;
    height:number;
    METER:number;

    private world:b2World;
    private parser:Parser;
    private shape:Shape;
    private collision:Collision;

    private recipeId:number = 0;

    private rotorArr: b2Vec2[][];
    private recipeArr: b2Vec2[][];

    moueJoint:any;

    constructor(width:number, height:number, METER:number, world:b2World, managers: any[]) {
        this.width = width;
        this.height = height;
        this.METER = METER;
        this.world = world;
        this.parser = managers['parser'];
        this.shape = managers['shape'];
        this.collision = managers['collision'];
    }

    loadAnimation() {
        var bdDef:b2BodyDef = new b2BodyDef();
        var body:b2Body = this.world.CreateBody(bdDef);

        var rotorDef:b2BodyDef = new b2BodyDef();
        var rotorBody:b2Body = this.world.CreateBody(rotorDef);
        rotorBody.SetType(b2_staticBody);
        rotorBody.SetFixedRotation(true);

        this.initParticle();

        var recipe:number = ((this.recipeId == 0) ? Math.floor(Math.random() * 12) + 1 : this.recipeId);
        this.rotorArr.push(this.parser.getRotor());
        this.recipeArr.push(this.parser.getRecipe(recipe));


        //shapeManager.LoadGround(body, recipeArr);
        //shapeManager.LoadStartLiquid(rotorBody, rotorDef, rotorArr);

        this.collision.linkShape(body, this.recipeArr);
        this.collision.linkShape(rotorBody, this.rotorArr);


        var image_recipe = parser.getImageFile(recipe);
        recipeRender(image_recipe);

        //rotorRender(rotorArr);
        var ingr_pop = 0;
        if (currentIngredients) {
            var totalQuantity = 0;


            for (var i = 0; i < currentIngredients.length; i++) {
                var ingr = currentIngredients[i];
                var qua = ingr.quantity;
                if (qua == null)
                    qua = 1;
                else
                    qua = qua.replace(';', '.');
                qua = parseFloat(qua);
                qua = Math.ceil(qua);
                totalQuantity = totalQuantity + qua;
            }
            //console.log(totalQuantity);


            for (var i = 0; i < currentIngredients.length; i++) {
                var ingr = currentIngredients[i];
                var qua = ingr.quantity;
                if (qua == null)
                    qua = 1;
                else
                    qua = qua.replace(';', '.');
                qua = parseFloat(qua);
                qua = Math.ceil(qua);
                var r = Math.ceil(qua / totalQuantity * glassQuantity);

                //console.log(ingr);
                //console.log(r);
                if (ingr.selectedColor && ingr.selectedColor != "#null") {
                    addFlowBottle(ingr_pop, ingr.selectedColor, ingr.opacity, r);
                    //ingr_pop += 6000;
                    ingr_pop += r * 4000;
                }

            }
        }
    }

    setRecipeId(recipeId:number) {
        this.recipeId = recipeId;
    }

    initParticle() {
        var psd = new b2ParticleSystemDef();
        psd.radius = 0.05;
        psd.dampingStrength = 0.4;
        psd.viscousStrength = 0.05;
        //psd.colorMixingStrength = 0.8;
        psd.colorMixingStrength = 0.01;

        if (this.world.particleSystems[0] != null)
            this.world.DestroyParticleSystem(this.world.particleSystems[0]);
        this.world.particleSystems[0]
        this.world.CreateParticleSystem(psd);
    }


    getCurrentParticleSystem() {
        if (this.world && this.world.particleSystems && this.world.particleSystems.length > 0)
            return this.world.particleSystems[0];
        return null;
    }
}
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
 }*/

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
};

step = function () {
    world.Step(timeStep, velocityIterations, positionIterations);
    time += 1 / 60;
}

function animate() {
    function componentToHex(c) {
        var hex = c.toString(16).toUpperCase();
        return hex.length == 1 ? "0" + hex : hex;
    }

    function rgbToHex(r, g, b) {
        return "0x" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    }

    step();

    var particles = world.particleSystems[world.particleSystems.length - 1].GetPositionBuffer();
    var colorsBuffer = world.particleSystems[world.particleSystems.length - 1].GetColorBuffer();

    var dropable_index = [];
    for (var key in circleIndex) {
        var index = circleIndex[key];
        var circle = circleArr[index];
        if (circle.y < height) {
            circle.position.x = ((particles[index * 2] ) * METER);
            circle.position.y = ((particles[(index * 2) + 1]) * METER);
            circle.clear();

            circle.beginFill(rgbToHex(colorsBuffer[index * 4], colorsBuffer[(index * 4) + 1], colorsBuffer[(index * 4) + 2]), colorsBuffer[(index * 4) + 3] / 255);
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


    for (var i = 0; i < objectArrInc; i++) {
        var currentPosition = objectPhysicsArr[i].GetWorldCenter();
        var currentAngle = objectPhysicsArr[i].GetAngle();

        objectDisplayArr[i].position.x = currentPosition.x * METER;
        objectDisplayArr[i].position.y = currentPosition.y * METER;
        objectDisplayArr[i].rotation = currentAngle;
    }
    renderers.render(stage);


    requestAnimationFrame(animate);

}
