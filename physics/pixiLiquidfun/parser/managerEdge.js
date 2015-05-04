/**
 * Created by Adrien on 08/04/2015.
 */

function getEdges(body, shapeArr) {
    var vectors = [];
    /*
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
     */
/*
    var x_center = (width / METER / 2) - 1;
    var y_center = 0.2;

    var width_rampe = 2;
    var height_rampe = 0.1;
    var mid_width_rampe = width_rampe / 2;
    var mid_height_rampe = height_rampe / 2;

    shapeFlow = new b2EdgeShape();
    var origin = new
    shapeFlow.Set(, new b2Vec2(x_center + mid_width_rampe, y_center + 3));
    shapeArr.push(new b2Vec2(x_center - mid_width_rampe, y_center + 0.1));
    shapeArr.push(new b2Vec2(x_center + mid_width_rampe, y_center + 3));
    shapeArr.push(vectors);
    body.CreateFixtureFromShape(shapeFlow, 10);*/

}

function edgerender(recipeArr) {
    /*
    var graphics = new PIXI.Graphics();

    graphics.lineStyle(glassLineStrength, glassLineColor);
    var vectorStart = recipeArr[0];
    var vectorEnd = recipeArr[1];
    graphics.moveTo(vectorStart.x * METER, vectorStart.y * METER);
    graphics.lineTo(vectorEnd.x * METER, vectorEnd.y * METER);
    graphics.endFill();

    stage.addChild(graphics);
    */
}