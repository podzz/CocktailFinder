/**
 * Created by Francois on 03/05/15.
 */

function linkShape(body, shapeArr) {
    for (var i = 0; i < shapeArr.length; i++) {
        var vectors = shapeArr[i];
        if (vectors != null && vectors.length > 0) {
            var vectorStart = vectors[0];
            for (var j = 1; j < vectors.length; j++) {
                var shape = new b2EdgeShape();
                shape.Set(new b2Vec2(vectorStart.x, vectorStart.y), new b2Vec2(vectors[j].x, vectors[j].y));
                body.CreateFixtureFromShape(shape, 10);
                vectorStart = vectors[j];
            }

            // PART TO LINK LAST AND FIRST VERTEX
            shape = new b2EdgeShape();
            shape.Set(new b2Vec2(vectorStart.x, vectorStart.y), new b2Vec2(vectors[0].x, vectors[0].y));
            body.CreateFixtureFromShape(shape, 10);
            vectors[vectors.length] = shape.vertex2;
        }
    }
}