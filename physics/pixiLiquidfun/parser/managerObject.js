/**
 * Created by Adrien on 14/04/2015.
 */

function createIceCube(offsetX, offsetY, size) {

    var bd = new b2BodyDef();
    var shape = new b2PolygonShape();
    bd.type = b2_dynamicBody;

    var tempWindowWidth = 5;  //FIXME : Replace by real windwoWidth;
    var tempWindowHeight = 6; //FIXME : Replace by real windwoHeight;

    tempWindowWidth /= 2;
    tempWindowHeight /= 2;

    var vertices = shape.vertices;
    var ve = new b2Vec2(offsetX + tempWindowWidth, offsetY + tempWindowHeight);
    vertices.push(ve);

    ve = new b2Vec2(offsetX + size + tempWindowWidth, offsetY + tempWindowHeight);
    vertices.push(ve);

    ve = new b2Vec2(offsetX + size + tempWindowWidth, offsetY + size + tempWindowHeight);
    vertices.push(ve);

    ve = new b2Vec2(offsetX + tempWindowWidth, offsetY + size + tempWindowHeight);
    vertices.push(ve);

    var body = world.CreateBody(bd);
    //shape.radius = 0.5;

    body.CreateFixtureFromShape(shape, 0.2);

    objectPhysicsArr[objectArrInc] = body;

    var image = new Image();
    image.src = "icecube.png"; //FIXME : Find another f**king texture !
    var base = new PIXI.BaseTexture(image);

    var texture = new PIXI.Texture(base);
    var iceCube = new PIXI.Sprite(texture);

    iceCube.anchor.x = 0.5;
    iceCube.anchor.y = 0.5;

    iceCube.width = size * METER;
    iceCube.height = size * METER;

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