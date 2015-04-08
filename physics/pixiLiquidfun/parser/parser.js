/**
 * Created by Adrien on 08/04/2015.
 */

function getAllShape(bobo, shapeArr) {
    var shapeArrInc = 0;

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