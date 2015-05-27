var request = require("request");

var ControllerRecipe = module.exports = function ControllerRecipe(_node) {
};

function cypher(query, cb) {
    console.log(query)
    var txUrl = "http://localhost:7474/db/data/transaction/commit";
    request.post({
            uri: txUrl,
            json: {statements: [{statement: query}]}
        },
        function (err, res) {
            console.log(res);
            if (cb) {
                cb(err, res.body)
            }
        })
}

// use a Cypher query to delete both this Recipe and the links on it.
ControllerRecipe.del = function(index, callback) {
    var query = 'MATCH (r:Recipe)-[re]-() WHERE r.index = "'+ index + '" DELETE r, re';
    var cb = function (err, data) {
        if (err) {
            return callback(err,null);
        }
        callback(null, "Deleted.");
    };
    cypher(query, cb);
};

// use a Cypher query to delete both this Recipe and the links on it.
ControllerRecipe.get = function(index, callback) {
    var query = 'MATCH (r:Recipe) WHERE r.index = "'+ index + '" RETURN r';
    var cb = function (err, data) {
        if (err) {
            return callback(err,null);
        }
        
        var data_formatted = {cocktails: []};
        var current_cocktail = null;
ne
        if (data && data.results[0] && data.results[0].data) {
            if (data.results[0].data.length > 0) {
                for (var i = 0; i < data.results[0].data.length; i++) {
                    var row_array = data.results[0].data[i].row[0];
                    data_formatted.cocktails.push(row_array);
                }
            }
        }
        //callback(null, data);
        callback(null, data_formatted);
    }
    cypher(query, cb);
};

// Get the all recipes
ControllerRecipe.getAll = function(length, offset, callback) {
    var query = 'MATCH (re:Recipe) RETURN re ORDER BY re.name';
    if (offset) {
        query += ' SKIP ' + (length * offset);
    }
    if (length) {
        query += ' LIMIT ' + length;
    }
    var cb = function (err, data) {
        if (err) {
            return callback(err,null);
        }
        
        var data_formatted = {cocktails: []};
        var current_cocktail = null;

        if (data && data.results[0] && data.results[0].data) {
            if (data.results[0].data.length > 0) {
                for (var i = 0; i < data.results[0].data.length; i++) {
                    var row_array = data.results[0].data[i].row[0];
                    data_formatted.cocktails.push(row_array);
                }
            }
        }
        //callback(null, data);
        callback(null, data_formatted);
    }
    cypher(query, cb);
};

module.exports = ControllerRecipe;