/**
 * Created by Adrien on 14/04/2015.
 */

function createIceCube() {

    var bd = new b2BodyDef();
    var shape = new b2PolygonShape();
    bd.type = b2_dynamicBody;

    var vertices = shape.vertices;
    var ve = new b2Vec2(0.0 + 2.5, 0.0 + 1);
    vertices.push(ve);

    ve = new b2Vec2(1.0 + 2.5, 0.0 + 1);
    vertices.push(ve);

    ve = new b2Vec2(1.0 + 2.5, 1.0 + 1);
    vertices.push(ve);

    ve = new b2Vec2(0.0 + 2.5, 1.0 + 1);
    vertices.push(ve);

    var body = world.CreateBody(bd);
    //shape.radius = 0.5;

    body.CreateFixtureFromShape(shape, 1);

    objectPhysicsArr[objectArrInc] = body;

    var image = new Image();
    image.src = "icecube.png";
    var base = new PIXI.BaseTexture(image);

    var texture = new PIXI.Texture(base);
    var iceCube = new PIXI.Sprite(texture);

    iceCube.anchor.x = 0.5;
    iceCube.anchor.y = 0.5;

    iceCube.position.x = 2.5 * METER;
    iceCube.position.y = 1 * METER;

    iceCube.width = 1 * METER;
    iceCube.height = 1 * METER;

    objectDisplayArr[objectArrInc++] = iceCube;
    stage.addChild(iceCube);
}

/*

 +  bd = new b2BodyDef();
 +  var circle = new b2CircleShape();
 +  bd.type = b2_dynamicBody;
 +  var body = world.CreateBody(bd);
 +  circle.position.Set(0, 4);
 +  circle.radius = 0.2;
 +  body.CreateFixtureFromShape(circle, 0.5);


 */