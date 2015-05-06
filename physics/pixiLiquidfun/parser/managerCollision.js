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
        var jd = new b2RevoluteJointDef();
        jd.motorSpeed = 0.05 * Math.PI;
        jd.maxMotorTorque = 1e7;
        jd.enableMotor = true;
        joint = jd.InitializeAndCreate(g_groundBody, body, new b2Vec2(0, 1));
        joint.SetMotorSpeed(2);
    }
}


function linkPolygonShape(body, shapeArr) {
    for (var i = 0; i < shapeArr.length; i++) {
        var vectors = shapeArr[i];
        if (vectors != null && vectors.length > 0) {
            var vectorStart = vectors[0];
            for (var j = 1; j < vectors.length; j++) {
                var shape = new b2PolygonShape();
                body.CreateFixtureFromShape(shape, 10);
                vectorStart = vectors[j];
            }

            // PART TO LINK LAST AND FIRST VERTEX
            shape = new b2PolygonShape();
            shape.SetAsArray(vectors, vectors.length);
            body.CreateFixtureFromShape(shape, 10);
            vectors[vectors.length] = shape.vertex2;
        }
        var jd = new b2RevoluteJointDef();
        jd.motorSpeed = 0.05 * Math.PI;
        jd.maxMotorTorque = 1e7;
        jd.enableMotor = true;
        joint = jd.InitializeAndCreate(g_groundBody, body, new b2Vec2(0, 1));
        joint.SetMotorSpeed(2);
    }
}