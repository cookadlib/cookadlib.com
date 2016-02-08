var superstatic = require('superstatic')
var connect = require('connect');

var app = connect();

app.use(superstatic({
  config: 'superstatic.json',
  cwd: 'www',
  env: 'env.json'
}));

app.listen(8080, function () {
  var host = this.address().address;
  var port = this.address().port;
  
  console.log('App listening at http://%s:%s', host, port);
});
