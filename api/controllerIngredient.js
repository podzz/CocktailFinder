var request = require("request");
var config  = require("./config");

var ControllerIngredient = module.exports = function ControllerIngredient(_node) {
}

function cypher(query, cb) {
    var txUrl = "http://";
    if (config.app.db.username && config.app.db.password) {
        txUrl += config.app.db.username + ":" + config.app.db.password + "@";
    }
    txUrl += config.app.db.endpoint;
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