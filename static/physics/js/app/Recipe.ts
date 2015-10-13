/**
 * Created by Francois on 03/05/15.
 */

class Recipe {
    glassQuantity:number = 8.0;

    generateDistribution(ingredient: any)
    {
        var distribution: any[] = null;
        var ingr_pop = 0;
        if (ingredient) {
            var totalQuantity = 0;


            for (var i = 0; i < ingredient.length; i++) {
                var ingr = ingredient[i];
                var qua = ingr.quantity;
                if (qua == null)
                    qua = 1;
                else
                    qua = qua.replace(';', '.');
                qua = parseFloat(qua);
                qua = Math.ceil(qua);
                totalQuantity = totalQuantity + qua;
            }


            for (var i = 0; i < ingredient.length; i++) {
                var ingr = ingredient[i];
                var qua = ingr.quantity;
                if (qua == null)
                    qua = 1;
                else
                    qua = qua.replace(';', '.');
                qua = parseFloat(qua);
                qua = Math.ceil(qua);
                var r = Math.ceil(qua / totalQuantity * this.glassQuantity);

                if (ingr.selectedColor && ingr.selectedColor != "#null") {
                    distribution.push({ 'pop': ingr_pop, 'color': ingr.selectedColor, 'opacity': ingr.opacity, 'quantity': r});
                    ingr_pop += r * 4000;
                }
            }
        }
        return distribution;
    }
}

/*
function rotorRender(arr) {
    var graphics = new this.PIXI.Graphics();

    for (var i = 0; i <= arr.length; i++) {
        if (i == 0) {
            graphics.lineStyle(glassLineStrength, glassLineColor);
            graphics.beginFill(glassFillColor, glassAlphaColor);
        }
        else
            graphics.lineStyle(displayLineStrength, displayLineColor);
        var vectors = arr[i];
        if (vectors != null) {
            graphics.moveTo(arr[i][0].x * METER, arr[i][0].y * METER);
            for (var j = 1; j < vectors.length; j++) {
                graphics.lineTo(vectors[j].x * METER, vectors[j].y * METER);
            }
        }
        graphics.endFill();
    }
    stage.addChild(graphics);
}*/