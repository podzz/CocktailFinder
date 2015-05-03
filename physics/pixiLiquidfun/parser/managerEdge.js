/**
 * Created by Adrien on 08/04/2015.
 */

function getEdges(body, shapeArr) {
    var vectors = [];

    var shape = new b2EdgeShape();
    shape.Set(new b2Vec2(0, height / METER), new b2Vec2(width / METER, height / METER));
    vectors[0] = shape.vertex1;
    shape.Set(new b2Vec2(width / METER, height / METER), new b2Vec2(width / METER, 0));
    vectors[1] = shape.vertex1;
    shape.Set(new b2Vec2(width / METER, 0), new b2Vec2(0, 0));
    vectors[2] = shape.vertex1;
    shape.Set(new b2Vec2(0, 0), new b2Vec2(0, height / METER));
    vectors[3] = shape.vertex1;

    shapeArr.push(vectors);
    linkShape(body, shapeArr);
}



