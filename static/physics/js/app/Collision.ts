/**
 * Created by Francois on 03/05/15.
 */
/// <reference path="lib/liquidfun.d.ts"/>
/// <reference path="lib/pixi.d.ts"/>

/**
 * This function takes the body created by the current Animation
 * The second argument is an array of array of vectors
 *
 * [array] ->
 *          [0] (array vectors) Link each vectors between them
 *          [1] (array vectors) Link each vectors between them
 *          [2] (array vectors) Link each vectors between them
 *
 * @param body
 * @param shapeArr
 * @return void
 */

class Collision {
    linkShape(body: b2Body, shapeArr: b2Vec2[][]){
        for (var i = 0; i < shapeArr.length; i++) {
            var vectors:b2Vec2[] = shapeArr[i];
            if (vectors != null && vectors.length > 0) {
                var vectorStart = vectors[0];
                for (var j = 1; j < vectors.length; j++) {
                    var shape = new b2EdgeShape();

                    shape.Set(new b2Vec2(vectorStart.x, vectorStart.y), new b2Vec2(vectors[j].x, vectors[j].y));
                    body.CreateFixtureFromShape(shape, 20);
                    vectorStart = vectors[j];
                }

                // PART TO LINK LAST AND FIRST VERTEX
                shape = new b2EdgeShape();
                shape.Set(new b2Vec2(vectorStart.x, vectorStart.y), new b2Vec2(vectors[0].x, vectors[0].y));
                body.CreateFixtureFromShape(shape, 20);
                vectors[vectors.length] = shape.vertex2;
            }
        }
    }

    linkRotor(body: b2Body){
        var shape:b2PolygonShape = new b2PolygonShape();
        shape.SetAsBoxXYCenterAngle(50,5, new b2Vec2(10,8), 0);
        body.CreateFixtureFromShape(shape, 0.5);
    }
}
/*
CollisionManager.prototype.linkShape = function (body, shapeArr) {
    for (var i = 0; i < shapeArr.length; i++) {
        var shape = new b2PolygonShape();
        var vertices = shape.vertices;
        var vectors = shapeArr[i];
        if (vectors != null && vectors.length > 0) {
            var vectorStart = vectors[0];
            var ve = new b2Vec2(vectorStart.x, vectorStart.y);
            vertices.push(ve);
            for (var j = 1; j < vectors.length; j++) {
                ve = new b2Vec2(vectors[j].x, vectors[j].y);
                vertices.push(ve);
            }
            body.CreateFixtureFromShape(shape, 20);
        }
    }
}*/
