var express = require('express');
var mysql = require('./dbcon.js');
var bodyParser = require('body-parser');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.use(bodyParser.urlencoded({extended:true}));
app.use('/static', express.static('public'));
app.set('view engine', 'handlebars');
app.set('port', 19951);
app.set('mysql', mysql);

app.use('/authors', require('./authors.js'));
app.use('/courses', require('./courses.js'));
app.use('/categories', require('./categories.js'));
app.use('/units', require('./units.js'));
app.use('/ingredients', require('./ingredients.js'));
app.use('/recipes', require('./recipes.js'));
app.use('/rcUpdate', require('./rcUpdate.js'));
app.use('/add-ingredients', require('./add-ingredients.js'));
app.use('/recs', require('./recs.js'));
app.use('/recipes_categories', require('./recipes_categories.js'));


app.use('/', express.static('public'));

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
