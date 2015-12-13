/// <reference path="lib/liquidfun.d.ts"/>
/// <reference path="lib/pixi.d.ts"/>

declare var world:any;
class Collision {
    /*BeginContactBody(contact:b2Contact):void {
        if (contact.GetFixtureB().body.GetUserData() == 1 && contact.GetFixtureA().body.GetUserData() == 1)
            console.log('touch glacon !');
    }*/

    /*BeginContactBody(contact:b2Contact):void {
        console.log('test');
    }*/

    public LinkShape(body:b2Body, vectors:any, world_cpy:b2World) {
        world = world_cpy;
        if (vectors != null && vectors.length > 0) {
            var vectorStart = vectors[0];
            for (var j = 1; j < vectors.length; j++) {
                var shape = new b2EdgeShape();
                shape.Set(new b2Vec2(vectorStart.x, vectorStart.y), new b2Vec2(vectors[j].x, vectors[j].y));
                body.CreateFixtureFromShape(shape, 0);
                vectorStart = vectors[j];
            }
            // PART TO LINK LAST AND FIRST VERTEX
            shape = new b2EdgeShape();
            shape.Set(new b2Vec2(vectorStart.x, vectorStart.y), new b2Vec2(vectors[0].x, vectors[0].y));
            body.CreateFixtureFromShape(shape, 0);
            vectors[vectors.length] = shape.vertex2;
        }
    }

    LinkRotor(body:b2Body, world_cpy:b2World) {
        world = world_cpy;
        var xPoint = -2.2;
        var yPoint = -3.5;
        var spawnPoint = new b2Vec2(xPoint, yPoint);

        var box = new b2PolygonShape();
        box.SetAsBoxXYCenterAngle(1.5, 0.5, spawnPoint, 0.9);
        body.CreateFixtureFromShape(box, 20);
    }
}
