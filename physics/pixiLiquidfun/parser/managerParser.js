/**
 * Created by Adrien on 08/04/2015.
 */

var associateArray = {};
var vectorsArray = {};

Parser.prototype.getParseResult = function(recipeId) {
    recipeArr.push(vectorsArray[recipeId.toString()]);
    return vectorsArray[recipeId.toString()];
};


Parser.prototype.initParser = function () {

    for (var item in associateArray) {
        $.ajax({
            url: associateArray[item.toString()],
            async: false,
            dataType: "text",
            success: function (data) {
                var f = JSON.parse(data);
                var temp = f.rigidBodies[0].shapes[0].vertices;
                var vectors = [];

                for (var i = 0; i < temp.length; i++) {
                    var vector = temp[i];
                    vector.x *= glassScale;
                    vector.x = (width / METER / 2) - glassScale / 2 + vector.x;

                    vector.y *= glassScale;
                    vector.y = height / METER - 1.2- vector.y;

                    vectors[i] = vector;
                }
                vectorsArray[item] = vectors;

            }
        });
    }
    console.log("Parser init done");
}

function Parser() {
    associateArray["1"] = "pixiLiquidFun/JSONFolder/tumblr.json";
    associateArray["2"] = "pixiLiquidFun/JSONFolder/tumblr.json";
    associateArray["3"] = "pixiLiquidFun/JSONFolder/shooter.json";
    associateArray["4"] = "pixiLiquidFun/JSONFolder/shooter.json";
    associateArray["5"] = "pixiLiquidFun/JSONFolder/pinte.json";
    associateArray["6"] = "pixiLiquidFun/JSONFolder/margarita.json";
    associateArray["7"] = "pixiLiquidFun/JSONFolder/wine.json";
    associateArray["8"] = "pixiLiquidFun/JSONFolder/champagne.json";
    associateArray["9"] = "pixiLiquidFun/JSONFolder/champagne.json";
    associateArray["10"] = "pixiLiquidFun/JSONFolder/smallwine.json";
    associateArray["11"] = "pixiLiquidFun/JSONFolder/margarita.json";
    associateArray["12"] = "pixiLiquidFun/JSONFolder/champagne.json";
    console.log("Parser created");
}


