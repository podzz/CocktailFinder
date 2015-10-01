/**
 * Created by Adrien on 08/04/2015.
 */
function ShapeManager()
{
}


ShapeManager.prototype.LoadGround = function(body, arr) {
    var vectors = [];

    var x_center = (width / METER / 2) - 1;
    var y_center = 0.2;

    var width_rampe = 0.9;
    var height_rampe = 0.4;
    var mid_width_rampe = width_rampe / 2;
    var mid_height_rampe = height_rampe / 2;

    var shapeFlow = new b2EdgeShape();
    //var origin = new
    shapeFlow.Set(new b2Vec2(x_center - mid_width_rampe - 0.5, y_center - 2) , new b2Vec2(x_center + mid_width_rampe, y_center + 2));
    //shapeFlow.SetTransform(0, 30);
    vectors.push(shapeFlow.vertex1);
    vectors.push(shapeFlow.vertex2);
    arr.push(vectors);
    body.CreateFixtureFromShape(shapeFlow, 10);

}

function edgerender(recipeArr) {

    var graphics = new PIXI.Graphics();

    graphics.lineStyle(glassLineStrength, glassLineColor);
    var vectorStart = recipeArr[0][0];
    var vectorEnd = recipeArr[0][1];
    graphics.moveTo(vectorStart.x * METER, vectorStart.y * METER);
    graphics.lineTo(vectorEnd.x * METER, vectorEnd.y * METER);
    graphics.endFill();

    stage.addChild(graphics);


}