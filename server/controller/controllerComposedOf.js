var request = require("request");

var ControllerComposedOf = module.exports = function ControllerComposedOf(_node) {
}

function cypher(query, cb) {
    var txUrl = "http://localhost:7474/db/data/transaction/commit";
    request.post({
            uri: txUrl,
            json: {statements: [{statement: query}]}
        },
        function (err, res) {
            cb(err, res.body)
        })
}

ControllerComposedOf.getComposedOfs = function(callback)
{
    var query = 'MATCH (re:Recipe)-[r:COMPOSED_OF]-(i:Ingredient) RETURN DISTINCT r.unity;';
    var cb = function (err, data) {
        if (err)
            return callback(err, null);
        
        var data_final = "";

        try {
            var info = data['results'][0]["data"];
            data_final = [];

            for (var i = info.length - 1; i >= 0; i--) {
                data_final.push(info[i]["row"][0]);
            }
        }
        catch (e) {
        }
        var data_formatted = {body: data_final, errors: data['errors']};
        callback(null, data_final);
    };
    cypher(query, cb);
}

ControllerComposedOf.getComposedOfById = function(id, callback)
{
    var query = 'MATCH (i:ComposedOf) WHERE i.index="' + id + '" RETURN i;';
    var cb = function (err, data) {
        if (err)
            return callback(err, null);
        
        var data_final = "";

        try {
            var info = data['results'][0]["data"];
            data_final = [];

            for (var i = info.length - 1; i >= 0; i--) {
                data_final.push(info[i]["row"][0]);
            }
        }
        catch (e) {
        }
        var data_formatted = data_final[0];
        callback(null, data_formatted);
    };
    cypher(query, cb);
}

ControllerComposedOf.putComposedOfById = function(id, ingredient, callback)
{
    var query = 'MATCH (i:ComposedOf { index : "' + id + '"}) SET i = ' + JSON.stringify(ingredient).replace(/\"([^(\")"]+)\":/g,"$1:") + ' RETURN i;';
    var cb = function (err, data) {
        if (err)
            return callback(err, null);
        
        var data_final = "";

        try {
            var info = data['results'][0]["data"];
            data_final = {ingredients: []};

            for (var i = info.length - 1; i >= 0; i--) {
                data_final["ingredients"].push(info[i]["row"][0]);
            }
        }
        catch (e) {
        }
        var data_formatted = {body: data_final, errors: data['errors']};
        callback(null, data_formatted);

    };
    cypher(query, cb);
}


ControllerComposedOf.addComposedOf = function(ingredient, callback)
{   
    var query = 'CREATE (i:ComposedOf ' + JSON.stringify(ingredient).replace(/\"([^(\")"]+)\":/g,"$1:") + ');';
    console.log(ingredient);
    console.log(query);

    var cb = function (err, data) {
        if (err)
            return callback(err, null);
        callback(null, data);
    };
    cypher(query, cb);
}

ControllerComposedOf.deleteComposedOfById = function(id, callback)
{   
    var query = 'MATCH (i:ComposedOf { index : "' + id + '"})-[r]-() DELETE i, r';

    var cb = function (err, data) {
        if (err)
            return callback(err, null);
        callback(null, data);
    };
    cypher(query, cb);
}