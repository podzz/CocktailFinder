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
    for (var i = 0; i < temp.length; i++) {
        var vector = temp[i];
        // BAD... SO BAD

        vector.x += 1.75;
        vector.y = 5 - vector.y;

        // END_BAD... SO BAD
        vectors[i] = vector;
    }
    shapeArr[shapeArrInc++] = vectors;
    init();
}