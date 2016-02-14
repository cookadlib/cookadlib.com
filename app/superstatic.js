import superstatic from 'superstatic';
import connect from 'connect';

const app = connect();

app.use(superstatic({
  config: 'superstatic.json',
  cwd: 'www',
  env: 'env.json',
  port: 8080
}));

app.listen(8080, function() {
  'use strict';
  const host = this.address().address;
  const port = this.address().port;

  console.log('App listening at http://%s:%s', host, port);
});
