/**
 * Created by Adrien on 08/04/2015.
 */
function getAndParseJSONFile(glasseId) {
    switch (glasseId) {
        case 1 : readTextFile("JSONFolder/champagne.json");
            break;
        case 2 : readTextFile("JSONFolder/cocktail.json");
            break;
        case 3 : readTextFile("JSONFolder/margarita.json");
            break;
        case 4 : readTextFile("JSONFolder/pint.json");
            break;
        case 5 : readTextFile("JSONFolder/shooter.json");
            break;
        case 6 : readTextFile("JSONFolder/smallwine.json");
            break;
        case 7 : readTextFile("JSONFolder/tumblr.json");
            break;
        case 8 : readTextFile("JSONFolder/wine.json");
            break;
        default : readTextFile("JSONFolder/tumblr.json");
    }
}

function readTextFile(path)
{
    $.ajax({
        url: path,
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
    for (var i = 0; i < temp.length; i++) {
        var vector = temp[i];
        // BAD... SO BAD

        vector.x *= glassScale;
        vector.y *= glassScale;
        vector.y = 5 - vector.y;

        if (vector.x > maxWidth)
            maxWidth = vector.x;

        // END_BAD... SO BAD
        vectors[i] = vector;
    }

    for (var i = 0; i < vectors.length; i++)
        vectors[i].x += 5 / 2 - maxWidth / 2;

    shapeArr[shapeArrInc++] = vectors;
    init();
}