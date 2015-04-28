/**
 * Created by Adrien on 08/04/2015.
 */
function getAndParseJSONFile(glasseId) {
    switch (glasseId) {
        case 1 : readTextFile("pixiLiquidFun/JSONFolder/tumblr.json");
            break;
        case 2 : readTextFile("pixiLiquidFun/JSONFolder/cocktail.json");
            break;
        case 3 : readTextFile("pixiLiquidFun/JSONFolder/shooter.json");
            break;
        case 5 : readTextFile("pixiLiquidFun/JSONFolder/pinte.json");
            break;
        case 6 : readTextFile("pixiLiquidFun/JSONFolder/margarita.json");
            break;
        case 7 : readTextFile("pixiLiquidFun/JSONFolder/wine.json");
            break;
        case 8 : readTextFile("pixiLiquidFun/JSONFolder/champagne.json");
            break;
        case 9 : readTextFile("pixiLiquidFun/JSONFolder/champagne.json");
            break;
        case 10 : readTextFile("pixiLiquidFun/JSONFolder/smallwine.json");
            break;
        case 11 : readTextFile("pixiLiquidFun/JSONFolder/margarita.json");
            break;
        case 12 : readTextFile("pixiLiquidFun/JSONFolder/champagne.json");
            break;
        default : readTextFile("pixiLiquidFun/JSONFolder/tumblr.json");
    }
}

function readTextFile(path)
{
    $.ajax({
        url: path,
        async: false,
        dataType: "text",
        success: function(data) {
            running(data);
        }
    });
}


function running(data) {
    var f = data;
    f = JSON.parse(data);
    var temp = f.rigidBodies[0].shapes[0].vertices;

    var vectors = [];
    var maxWidth = 0;
    var width = $("#cocktailRenderer").width();
    var height = $("#cocktailRenderer").height();
    for (var i = 0; i < temp.length; i++) {
        var vector = temp[i];
        // BAD... SO BAD

        vector.x *= glassScale;
        vector.x = (width / METER / 2) - glassScale / 2 + vector.x;

        vector.y *= glassScale;
        vector.y = height / METER - vector.y;

        if (vector.x > maxWidth)
            maxWidth = vector.x;

        // END_BAD... SO BAD
        vectors[i] = vector;
    }
    shapeArrInc = 0;
    shapeArrInc = [];

    shapeArr[shapeArrInc++] = vectors;
    if (withrunning == true)
        init();
}