/**
 * Created by Francois on 10/05/15.
 */

var Bing = require('node-bing-api')({accKey: "ofiH66W+uTTX65ME7FKhtd2XtgAHxNEljh+700JzqFs"});
var fs = require('fs');

var ControllerBing = module.exports = function ControllerBing() {
};

ControllerBing.dlBingIngredient = function (search, callback) {
    var ingredient = {};
    var count_results = 5;
    Bing.images(search, function (error, res, body) {
        ingredient[search] = [];

        if (body != null && body.d != null) {
            if (body.d.results.length < count_results)
                count_results = body.d.results.length;

            for (var i = 0; i < count_results; i++) {
                ingredient[search].push(body.d.results[i].MediaUrl);
            }
            console.log(ingredient[search].length);

            callback(null, ingredient);
        }
    }, {
        skip: 0
    });
}