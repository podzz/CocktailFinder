// Cocktail API

// Getting neo4j object
var neo4j = require('neo4j');

// Connection do DB
var db = new neo4j.GraphDatabase(
    process.env['NEO4J_URL'] ||
    process.env['GRAPHENEDB_URL'] ||
    'http://localhost:7474'
    );

var ControllerCocktail = function ControllerCocktail(_node) {
};

// Seeks the recipe with the IDs given in param, and returns
// a JSON Object with all its assets
ControllerCocktail.getCocktailsById = function(idTab, callback) {
    var query = 'MATCH (re:Recipe)-[r]-(i:Ingredient) WHERE';

    for (var i = 0; i < idTab.length; ++i) {
        if (i == idTab.length - 1) {
            query += ' re.index = "' + idTab[i] +'" ';
        } else {
            query += ' re.index = "' + idTab[i] +'" OR';
        }
    }
    query += 'RETURN re.index, re.name, i.index, r.quantity, r.unity, i.name';

    db.query(query, null, function (err, results) {
        // ICO Request fail        
        if (err) {
          return callback(err);
        }
        
        var formatted = {
            cocktails : []
        };

        var tmp_sequence = [];

        // Formatting ingredients
        for (var i = 0; i < results.length; ++i) {
            if (tmp_sequence.indexOf(results[i]['re.index']) == -1) {

                tmp_sequence.push(results[i]['re.index']);

                formatted.cocktails.push({
                    index : results[i]['re.index'],
                    name : results[i]['re.name'],
                    ingredients : [{
                        id : results[i]['i.index'],
                        name : results[i]['i.name'],
                        quantity : results[i]['r.quantity'],
                        unity : results[i]['r.unity'],
                    }]
                })
            } else {
                    formatted.cocktails[tmp_sequence.indexOf(results[i]['re.index'])].ingredients.push({
                    id : results[i]['i.index'],
                    name : results[i]['i.name'],
                    quantity : results[i]['r.quantity'],
                    unity : results[i]['r.unity'],
                })
            }
        };

        // Async return call
        callback(null, formatted);
    });
};

// Seeks the recipe with the ID given in param, and returns
// a JSON Object with all its assets
ControllerCocktail.getCocktailById = function(id, callback) {
    var query = [
    'MATCH (re:Recipe)-[r]-(i:Ingredient)',
    'WHERE re.index = "' + id +'"',
    'RETURN re.index, re.name,',
    'i.index, r.quantity, r.unity, i.name;'
    ].join('\n');

    console.log(db.query);

    db.query(query, null, function (err, results) {
        // ICO Request fail
        if (err) {
            console.log("ERROR : " + err);
            console.log("QUERY FAILED : " + query);
            console.log("Error in DB call");
            return callback(err);
        }
        // Iteration through results to get the proper JSON structure
        var formatted = {
            cocktails: [{
                index : results[0]['re.index'],
                name : results[0]['re.name'],
                ingredients: []
            }]
        };

        // Formatting ingredients
        for (var i = 0; i < results.length; ++i) {
            formatted.cocktails.ingredients.push({
                id : results[i]['i.index'],
                name : results[i]['i.name'],
                quantity : results[i]['r.quantity'],
                unity : results[i]['r.unity'],
            })
        };
        // Async return call
        callback(null, formatted);
    });
};


// Seeks the recipe with the IDs given in param, and returns
// a JSON Object with all its assets
ControllerCocktail.getCocktailsByMissingIds = function(idTab, number, callback) {
    var query = 'MATCH (re:Recipe)-[r]-(i:Ingredient) WHERE';
    console.log(idTab.length);
    for (var i = 0; i < idTab.length; ++i) {
        if (i == idTab.length - 1) {
            query += ' i.index <> "' + idTab[i] +'" ';
        } else {
            query += ' i.index <> "' + idTab[i] +'" AND';
        }
    }
    query += 'RETURN re.index LIMIT ' + number;

    db.query(query, null, function (err, results) {
        var formatted = [];
        for (var i = 0; i < results.length; ++i) {
            formatted.push(results[i]['re.index']);
        }
        
        ControllerCocktail.getCocktailsById(formatted, callback);
    });
};

module.exports = ControllerCocktail;