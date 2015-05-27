
/*
 * GET home page.
 */

exports.logger = function(req, res){
	res.sendFile('./recipes.html');
};
