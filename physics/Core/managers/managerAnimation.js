/**
 * Created by Francois on 08/05/15.
 */

function AnimationManager() {
    var AnimationManagerObject = this;

    var bdDef = new b2BodyDef();
    var body = world.CreateBody(bdDef);

    var recipeId = Math.floor(Math.random() * 12) + 1;
    initParticle();

    parser.getParseRotor();
    parser.getParseResult(recipeId);

    getEdges(body, edgeArr);
    //edgerender(edgeArr);
    collisionManager.linkShape(body, recipeArr);
    //linkPolygonShape(body, rotorArr);
    var image_recipe = parser.getImageFile(recipeId);
    recipeRender(image_recipe);
    var ingr_pop = 1000;
    if (currentIngredients) {
        for (var i = 0; i < currentIngredients.length; i++) {
            var ingr = currentIngredients[i];
            if (ingr.selectedColor && ingr.selectedColor != "#null") {
                addFlowBottle(ingr_pop, ingr.selectedColor);
                ingr_pop += 3000;
            }
        }
    }
    //rotorRender(rotorArr);
    //addColorGroup(1000, 0.1, 0.8);
    //resetTimeline();
    //addColorGroup(1000, 0.1, 0.8);
    //addColorGroup(5000, 0.1, 0.8);
    //addFlowBottle(100, 2, 0.06);
    //addFlowBottle(100, 2, 0.06);
    //var bottle2 = setTimeout(function() { addFlowBottle(100, 2, 0.06);}, 5000);

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

step = function () {
    world.Step(timeStep, velocityIterations, positionIterations);
    this.time += 1 / 60;
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
