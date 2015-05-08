/**
 * Created by Francois on 03/05/15.
 */

function recipeRender(image_url) {

    var image = new Image();
    image.src = image_url;
    var base = new PIXI.BaseTexture(image);
    var texture = new PIXI.Texture(base);
    var bottle = new PIXI.Sprite(texture);
    bottle.alpha = 0.9;

    var real_dimensions = findWidthRecipe();

    bottle.width  = real_dimensions.width;

    bottle.height = real_dimensions.height;;
    bottle.anchor.x = 0.5;
    bottle.x = width / 2;
    bottle.y = real_dimensions.max_y * METER - bottle.height;

    recipeArr.push(bottle);
    stage.addChild(bottle);
    //bottle = null;
    //recipe_graphics.clear();
}

function rotorRender(arr)
{
    var graphics = new PIXI.Graphics();

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
}

function findWidthRecipe()
{
    var min_x = 300;
    var max_x = -300;

    var min_y = 300;
    var max_y = -300;
    if (recipeArr[0].length > 0) {
        for (var i = 0; i < recipeArr[0].length; i++) {
            if (recipeArr[0][i].x > max_x)
                max_x = recipeArr[0][i].x;
            if (recipeArr[0][i].x < min_x)
                min_x = recipeArr[0][i].x;

            if (recipeArr[0][i].y > max_y)
                max_y = recipeArr[0][i].y;
            if (recipeArr[0][i].y < max_y)
                min_y = recipeArr[0][i].y;
        }
    }
    var width_aux = (max_x - min_x) * METER;
    var height_aux = (max_y - min_y) * METER;
    var dimension = new Object();
    dimension.width = width_aux;
    dimension.height = height_aux;
    dimension.max_y = max_y;
    return dimension;
}