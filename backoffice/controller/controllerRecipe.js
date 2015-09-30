var request = require("request");

var ControllerRecipe = module.exports = function ControllerGlass(_node) {
}

function cypher(query, cb) {
    var txUrl = "http://localhost:7474/db/data/transaction/commit";
    request.post({
            uri: txUrl,
            json: {statements: [{statement: query}]}
        },
        function (err, res) {
            if (cb && res)
                cb(err, res.body)
        })
}

ControllerRecipe.getRecipes = function(callback)
{
    var query = 'MATCH (r:Recipe) RETURN r;';
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

ControllerRecipe.getRecipeById = function(id, callback)
{
    var query = 'MATCH (i:Recipe) WHERE i.index="' + id + '" RETURN i;';
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
        callback(null, data_final[0]);
    };
    cypher(query, cb);
}

ControllerRecipe.putRecipeById = function(id, glass, callback)
{
    var query = 'MATCH (i:Recipe { index : "' + id + '"}) SET i = ' + JSON.stringify(glass).replace(/\"([^(\")"]+)\":/g,"$1:") + ' RETURN i;';
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
        callback(null, data_final[0]);

    };
    cypher(query, cb);
}


ControllerRecipe.addRecipe = function(ingredient, callback)
{   
    var query = 'CREATE (i:Recipe ' + JSON.stringify(ingredient).replace(/\"([^(\")"]+)\":/g,"$1:") + ');';

    var cb = function (err, data) {
        if (err)
            return callback(err, null);
        callback(null, data);
    };
    cypher(query, cb);
}

ControllerRecipe.deleteRecipeById = function(id, callback)
{   
    var query = 'MATCH (i:Recipe { index : "' + id + '"})-[r]-() DELETE i, r';

    var cb = function (err, data) {
        if (err)
            return callback(err, null);
        callback(null, data);
    };
    cypher(query, cb);
}