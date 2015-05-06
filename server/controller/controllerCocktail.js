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
    var query = 'MATCH (rec:Recipient)-[]-(re:Recipe)-[r]-(i:Ingredient) WHERE';

    for (var i = 0; i < idTab.length; ++i) {
        if (i == idTab.length - 1) {
            query += ' re.index = "' + idTab[i] +'" ';
        } else {
            query += ' re.index = "' + idTab[i] +'" OR';
        }
    }
    query += 'RETURN re.index, re.name, i.index, r.quantity, r.unity, i.name, rec.index';

    db.query(query, null, function (err, results) {
        console.log(query);
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
                    glass: results[i]['rec.index'],
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
// TO FIX
ControllerCocktail.getCocktailById = function(index, callback) {
    var query = 'MATCH (rec:Recipient)-[]-(re:Recipe)-[r]-(i:Ingredient) WHERE';
    query += ' re.index = "' + index +'" ';
    query += 'RETURN re.index, re.name, i.index, r.quantity, r.unity, i.name, rec.index';

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
                    glass: results[i]['rec.index'],
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
// TO FIX
ControllerCocktail.getCocktailByName = function(name, callback) {
    var query = 'MATCH (rec:Recipient)-[]-(re:Recipe)-[r]-(i:Ingredient) WHERE';
    query += ' re.name = "' + name +'" ';
    query += 'RETURN re.index, re.name, i.index, r.quantity, r.unity, i.name, rec.index';

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
                    glass: results[i]['rec.index'],
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


// Seeks the recipe with the IDs given in param, and returns
// a JSON Object with all its assets
ControllerCocktail.getCocktailsByMissingIds = function(idTab, number, callback) {
    var query1 = 'MATCH (r:Recipe)';
    var query2 = '';
    if (!idTab) {
        query1 += ' ';
    } else { 
        query1 += ', ';
        for (var i = 0; i < idTab.length; ++i) {
            if (i == idTab.length - 1) {
                query1 += '(i' + i + ':Ingredient { index:"' + idTab[i] + '" }) ';
                query2 += 'NOT r--i' + i + ' ';
            } else {
                query1 += '(i' + i + ':Ingredient { index:"' + idTab[i] + '" }), ';
                query2 += 'NOT r--i' + i + ' AND ';            
            }
        }
        query1 += 'WHERE '
    }
    query2 += 'RETURN r.index LIMIT ' + number;
    console.log(query1 + query2);
    db.query(query1 + query2, null, function (err, results) {
        var formatted = [];

        for (var i = 0; i < results.length; ++i) {
            formatted.push(results[i]['r.index']);
        }
        ControllerCocktail.getCocktailsById(formatted, callback);
    });
};

ControllerCocktail.getAll = function(callback) {
    var query = 'MATCH (r:Recipe) RETURN r.name, r.index';

    db.query(query, null, function(err, results)
    {
        var formatted = [];

        for (var i = 0; i < results.length; ++i) {
            formatted.push({ index: results[i]['r.index'],
                             name: results[i]['r.name']});
        }
        callback(null,formatted);
    });
};

module.exports = ControllerCocktail;