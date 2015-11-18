var request = require("request");
var config  = require("../config");

var ControllerIngredientSubClass = module.exports = function ControllerIngredientSubClass(_node) {
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

ControllerIngredientSubClass.getSubIngredients = function(callback)
{
    var query = 'MATCH (i:IngredientSubClass) RETURN i;';
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
        callback(null, data_formatted);
    };
    cypher(query, cb);
}