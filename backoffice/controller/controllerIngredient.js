var request = require("request");

var ControllerIngredient = module.exports = function ControllerIngredient(_node) {
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

// use a Cypher query to delete both this Ingredient and the recipes using it.
ControllerIngredient.setColor = function(ingredient_id, color, callback)
{
    var query = 'MATCH (i:Ingredient) WHERE i.index="' + ingredient_id + '" SET i.selectedColor ="' + color + '";';
    var cb = function (err, data) {
        if (err)
            return callback(err,null);
        var data_formatted = {response: data};

        callback(null, data_formatted);
    };
    cypher(query, cb);
}

ControllerIngredient.setOpacity = function(ingredient_id, opacity, callback)
{
    var query = 'MATCH (i:Ingredient) WHERE i.index="' + ingredient_id + '" SET i.opacity="' + opacity + '";';
    var cb = function (err, data) {
        if (err)
            return callback(err,null);
        callback(null, data);
    };
    cypher(query, cb);
}

ControllerIngredient.getIngredients = function(callback)
{
    var query = 'MATCH (i:Ingredient) RETURN i;';
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

ControllerIngredient.getIngredientById = function(id, callback)
{
    var query = 'MATCH (i:Ingredient) WHERE i.index="' + id + '" RETURN i;';
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

ControllerIngredient.putIngredientById = function(id, ingredient, callback)
{
    var query = 'MATCH (i:Ingredient { index : "' + id + '"}) SET i = ' + JSON.stringify(ingredient).replace(/\"([^(\")"]+)\":/g,"$1:") + ' RETURN i;';
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


ControllerIngredient.addIngredient = function(ingredient, callback)
{   
    var query = 'CREATE (i:Ingredient ' + JSON.stringify(ingredient).replace(/\"([^(\")"]+)\":/g,"$1:") + ');';
    console.log(ingredient);
    console.log(query);

    var cb = function (err, data) {
        if (err)
            return callback(err, null);
        callback(null, data);
    };
    cypher(query, cb);
}

ControllerIngredient.deleteIngredientById = function(id, callback)
{   
    var query = 'MATCH (i:Ingredient { index : "' + id + '"})-[r]-() DELETE i, r';

    var cb = function (err, data) {
        if (err)
            return callback(err, null);
        callback(null, data);
    };
    cypher(query, cb);
}