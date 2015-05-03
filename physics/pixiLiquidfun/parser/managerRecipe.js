/**
 * Created by Francois on 03/05/15.
 */

function recipeRender(recipeArr) {
    var graphics = new PIXI.Graphics();
    var blur = new PIXI.BlurFilter();
    var thresold = new PIXI.TresholdFilter();
    blur.blur = 7;
    graphics.filters = [blur, thresold];
    graphics.lineStyle(20, 0x000000);

    for (var i = 0; i <= recipeArr.length; i++) {
        if (i == 0) {
            graphics.lineStyle(glassLineStrength, glassLineColor);
            graphics.beginFill(glassFillColor, glassAlphaColor);
        }
        //else
        //graphics.lineStyle(displayLineStrength, displayLineColor);
        var vectors = recipeArr[i];
        if (vectors != null) {
            graphics.moveTo(recipeArr[i][0].x * METER, recipeArr[i][0].y * METER);
            for (var j = 1; j < vectors.length; j++) {
                graphics.lineTo(vectors[j].x * METER, vectors[j].y * METER);
            }
        }
        graphics.endFill();
    }

    stage.addChild(graphics);
}