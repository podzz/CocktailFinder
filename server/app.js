var express = require('express');
var session = require('cookie-session'); // Charge le middleware de sessions
var bodyParser = require('body-parser'); // Charge le middleware de gestion des paramètres
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var app = express();


/* On utilise les sessions */
app.use(session({secret: 'cocktailtopsecret'}))


/* S'il n'y a pas de cocktaillist dans la session,
on en crée une vide sous forme d'array avant la suite */
.use(function(req, res, next){
    if (typeof(req.session.cocktaillist) == 'undefined') {
        req.session.cocktaillist = [];
    }
    next();
})

/* On affiche la cocktaillist et le formulaire */
.get('/cocktail', function(req, res) { 
    res.render('cocktail.ejs', {cocktaillist: req.session.cocktaillist});
})

/* On ajoute un élément à la cocktaillist */
.post('/cocktail/ajouter/', urlencodedParser, function(req, res) {
    if (req.body.newcocktail != '') {
        req.session.cocktaillist.push(req.body.newcocktail);
    }
    res.redirect('/cocktail');
})

/* Supprime un élément de la cocktaillist */
.get('/cocktail/supprimer/:id', function(req, res) {
    if (req.params.id != '') {
        req.session.cocktaillist.splice(req.params.id, 1);
    }
    res.redirect('/cocktail');
})

/* On redirige vers la cocktaillist si la page demandée n'est pas trouvée */
.use(function(req, res, next){
    res.redirect('/cocktail');
})

.listen(8080);   