/**
 * Created by Adrien on 08/04/2015.
 */

function getAndParseJSONFile() {
    readTextFile("file:///C:/Users/Adrien/Documents/MTI/PLIC/CocktailFinder/physics/pixiLiquidfun/JSONFolder/shooter.txt")
}

function getAllShape(bobo, shapeArr) {
    var shapeArrInc = 0;

    getAndParseJSONFile();

    var shape = new b2EdgeShape();
    shape.Set(new b2Vec2(0, windowHeight / METER), new b2Vec2(windowWidth / METER, windowHeight / METER));
    shapeArr[shapeArrInc++] = shape;
    bobo.CreateFixtureFromShape(shape, 0.1);

    shape = new b2EdgeShape();
    shape.Set(new b2Vec2(0, windowHeight / METER), new b2Vec2(0, 0));
    shapeArr[shapeArrInc++] = shape;
    bobo.CreateFixtureFromShape(shape, 0.1);

    shape = new b2EdgeShape();
    shape.Set(new b2Vec2(windowWidth / METER, windowHeight / METER), new b2Vec2(windowWidth / METER, 0));
    shapeArr[shapeArrInc++] = shape;
    bobo.CreateFixtureFromShape(shape, 0.1);

    shape = new b2EdgeShape();
    shape.Set(new b2Vec2(0, 0), new b2Vec2(windowWidth / METER, 0));
    shapeArr[shapeArrInc++] = shape;
    bobo.CreateFixtureFromShape(shape, 0.1);



    TransformShapeArr(shapeArr);
}

function TransformShapeArr(shapeArr) {
    for (var i = 0; i < shapeArr.length; i++) {
        var vectors = [];
        vectors[0] = shapeArr[i].vertex1;
        vectors[1] = shapeArr[i].vertex2;
        shapeArr[i] = vectors;
    }
}




/// GLASS

/*bd = new b2BodyDef();
 shape = new b2EdgeShape();
 shape.Set(new b2Vec2(1, 1), new b2Vec2(2, 4));
 bobo.CreateFixtureFromShape(shape, 0.1);

 bd = new b2BodyDef();
 shape = new b2EdgeShape();
 shape.Set(new b2Vec2(3, 1), new b2Vec2(2, 4));
 bobo.CreateFixtureFromShape(shape, 0.1);


 bd = new b2BodyDef();
 shape = new b2EdgeShape();
 shape.Set(new b2Vec2(3, 1), new b2Vec2(4, 4));
 bobo.CreateFixtureFromShape(shape, 0.1);


 bd = new b2BodyDef();
 shape = new b2EdgeShape();
 shape.Set(new b2Vec2(5, 1), new b2Vec2(4, 4));
 bobo.CreateFixtureFromShape(shape, 0.1);*/


/// END_TEST

/*var wg = new b2PolygonShape();
 wg.SetAsBoxXYCenterAngle(windowWidth / METER, 0.05, new b2Vec2(windowWidth / METER / 2, windowHeight / METER), 0);
 bobo.CreateFixtureFromShape(wg, 1);


 //left wall
 var wgl = new b2PolygonShape();
 wgl.SetAsBoxXYCenterAngle(0.05, windowHeight / METER, new b2Vec2(0, windowHeight / METER), 0);
 bobo.CreateFixtureFromShape(wgl, 1);

 //right wall
 var wgr = new b2PolygonShape();
 wgr.SetAsBoxXYCenterAngle(0.05, windowHeight / METER, new b2Vec2(windowWidth / METER - 0.05, windowHeight / METER), 0);
 bobo.CreateFixtureFromShape(wgr, 1);*/


// setup particles