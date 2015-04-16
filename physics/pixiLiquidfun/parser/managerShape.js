/**
 * Created by Adrien on 08/04/2015.
 */

function getAllShape(bobo, shapeArr, shapeArrInc) {
    var vectors = [];

    var shape = new b2EdgeShape();
    shape.Set(new b2Vec2(0, windowHeight / METER), new b2Vec2(windowWidth / METER, windowHeight / METER));
    vectors[0] = shape.vertex1;
    shape.Set(new b2Vec2(windowWidth / METER, windowHeight / METER), new b2Vec2(windowWidth / METER, 0));
    vectors[1] = shape.vertex1;
    shape.Set(new b2Vec2(windowWidth / METER, 0), new b2Vec2(0, 0));
    vectors[2] = shape.vertex1;
    shape.Set(new b2Vec2(0, 0), new b2Vec2(0, windowHeight / METER));
    vectors[3] = shape.vertex1;


    shapeArr[shapeArrInc++] = vectors;

    vectors = [];
    shape = new b2CircleShape();
    


    createCollision(bobo, shapeArr);
}

function createCollision(bobo, shapeArr) {
    for (var i = 0; i < shapeArr.length; i++) {
        var vectors = shapeArr[i];
        var vectorStart = vectors[0];
        for (var j = 1; j < vectors.length; j++) {
            var shape = new b2EdgeShape();
            shape.Set(new b2Vec2(vectorStart.x, vectorStart.y), new b2Vec2(vectors[j].x, vectors[j].y));
            bobo.CreateFixtureFromShape(shape, 10);
            vectorStart = vectors[j];
        }

        // PART TO LINK LAST AND FIRST VERTEX
        shape = new b2EdgeShape();
        shape.Set(new b2Vec2(vectorStart.x, vectorStart.y), new b2Vec2(vectors[0].x, vectors[0].y));
        bobo.CreateFixtureFromShape(shape, 10);
        vectors[vectors.length] = shape.vertex2;
    }
}

function shapeRender() {
    var graphics = new PIXI.Graphics();
    graphics.lineStyle(20, 0x000000);
    for (var i = 0; i < shapeArr.length; i++) {
        if (i == 0) {
            graphics.lineStyle(glassLineStrength, glassLineColor);
            graphics.beginFill(glassFillColor, glassAlphaColor);
        }
        else
            graphics.lineStyle(displayLineStrength, displayLineColor);
        var vectors = shapeArr[i];
        graphics.moveTo(vectors[0].x * METER, vectors[0].y * METER);
        for (var j = 1; j < vectors.length; j++) {
            graphics.lineTo(vectors[j].x * METER, vectors[j].y * METER);
        }
        graphics.endFill();
    }
    stage.addChild(graphics);
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