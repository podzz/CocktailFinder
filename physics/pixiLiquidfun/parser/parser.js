/**
 * Created by Adrien on 08/04/2015.
 */
function getAndParseJSONFile() {
    readTextFile("JSONFolder/shooter.txt")
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