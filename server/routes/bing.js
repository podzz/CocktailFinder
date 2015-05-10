/**
 * Created by Francois on 10/05/15.
 */
var ControllerBing = require('../controller/controllerBing');

exports.downloadPicturesIngredients = function(req, res, next)
{
    var search = req.params.search;
    ControllerBing.dlBingIngredient(search,function(err, result) {
        res.json(result);
    });
}
