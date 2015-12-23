var superstatic = require('superstatic')
var connect = require('connect');

var app = connect();

app.use(superstatic({
  config: 'superstatic.json',
  cwd: 'www',
  env: 'env.json'
}));

app.listen(3000, function () {

});
