import superstatic from 'superstatic';
import connect from 'connect';

import packageJson from '../package.json';

const app = connect();

app.use(superstatic({
  config: '../superstatic.json',
  cwd: '.',
  env: 'env.json'
}));

app.listen(packageJson.config.http.port, function() {
  'use strict';

  const host = this.address().address;
  const port = this.address().port;

  console.log('App listening at http://%s:%s', host, port);
});
