var request = require("request");

var ControllerGlass = module.exports = function ControllerGlass(_node) {
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

ControllerGlass.getGlasses = function(callback)
{
    var query = 'MATCH (r:Recipient) RETURN r;';
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

ControllerGlass.getGlassById = function(id, callback)
{
    var query = 'MATCH (i:Recipient) WHERE i.index="' + id + '" RETURN i;';
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

ControllerGlass.putGlassById = function(id, glass, callback)
{
    var query = 'MATCH (i:Recipient { index : "' + id + '"}) SET i = ' + JSON.stringify(glass).replace(/\"([^(\")"]+)\":/g,"$1:") + ' RETURN i;';
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


ControllerGlass.addGlass = function(ingredient, callback)
{   
    var query = 'CREATE (i:Recipient ' + JSON.stringify(ingredient).replace(/\"([^(\")"]+)\":/g,"$1:") + ');';

    var cb = function (err, data) {
        if (err)
            return callback(err, null);
        callback(null, data);
    };
    cypher(query, cb);
}

ControllerGlass.deleteGlassById = function(id, callback)
{   
    var query = 'MATCH (i:Recipient { index : "' + id + '"})-[r]-() DELETE i, r';

    var cb = function (err, data) {
        if (err)
            return callback(err, null);
        callback(null, data);
    };
    cypher(query, cb);
}