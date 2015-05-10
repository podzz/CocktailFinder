/**
 * Created by Francois on 10/05/15.
 */

var Bing = require('node-bing-api')({accKey: "ofiH66W+uTTX65ME7FKhtd2XtgAHxNEljh+700JzqFs"});
var fs = require('fs');

var ControllerBing = module.exports = function ControllerBing() {
};

ControllerBing.dlBingIngredient = function (search, callback) {
    var ingredient = {images: []};
    Bing.images(search, function (error, res, body) {
        for (var i = 0; i < body.d.results.length; i++) {
            ingredient.images.push({url: body.d.results[i].MediaUrl});
        }
        console.log(ingredient.images.length);

        callback(null, ingredient);
    }, {
        skip: 0
    });

}