var express = require('express');
var app = express();

var cafeteria_list = require('./models/data/cafeteria_list.json');
var menu_by_cafeteria = require('./models/data/menu_by_cafeteria.json');

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index', {cafeteria_list: cafeteria_list});
});

app.get('/cafeteria/:id', function(request, response) {
   var id = request.params.id;
   var menu = menu_by_cafeteria[id];
   response.render('pages/cafeteria', {menu: menu});
});

app.get('/checkout', function(request, response){
   response.render('pages/checkout')
});

app.get('/admin', function(request, response) {
  response.render('admin/index')
});

app.get('/api/v1/cafeteria/list', function(request, response) {
   var jsonResponse = {};
   jsonResponse.data = cafeteria_list;
   response.setHeader('Content-Type', 'application/json');
   response.send(JSON.stringify(jsonResponse));
});

app.get('/api/v1/cafeteria/:id/menu', function(request, response) {
   var jsonResponse = {};
   jsonResponse.data = [];
   var id = request.params.id;

   jsonResponse.data = menu_by_cafeteria[id];
   response.setHeader('Content-Type', 'application/json');
   response.send(JSON.stringify(jsonResponse));

});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
