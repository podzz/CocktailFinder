/**
 * Created by Francois on 08/05/15.
 */
var time = 0;
var body = null;

var rotorDef;
var that = null;

function AnimationManager() {
    var AnimationManagerObject = this;

    this.mouseJoint = null;
    that = this;

    var bdDef = new b2BodyDef();
    body = world.CreateBody(bdDef);

    var rotorDef = new b2BodyDef();
    var rotorBody = world.CreateBody(rotorDef);
    rotorBody.type = b2_staticBody;
    rotorBody.fixedRotation = true;

    var recipeId = Math.floor(Math.random() * 12) + 1;
    if (currentRecipe != null)
        recipeId = currentRecipe;
    initParticle();

    rotorArr.push(parser.getParseRotor());

    recipeArr.push(parser.getParseResult(recipeId));

    //shapeManager.LoadGround(body, recipeArr);
    //shapeManager.LoadStartLiquid(rotorBody, rotorDef, rotorArr);

    collisionManager.LinkShape(body, recipeArr);
    collisionManager.LinkShape(rotorBody, rotorArr);

    var image_recipe = parser.getImageFile(recipeId);

    recipeRender(image_recipe);

    rotorRender(rotorArr);
    var ingr_pop = 0;
    if (currentIngredients) {
        for (var i = 0; i < currentIngredients.length; i++) {
            var ingr = currentIngredients[i];
            if (ingr.selectedColor && ingr.selectedColor != "#null") {
                addFlowBottle(ingr_pop, ingr.selectedColor, ingr.opacity);
                ingr_pop += 3000;
            }
        }
    }

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
            md.bodyA = g_groundBody;
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
