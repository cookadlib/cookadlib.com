import connect from 'connect';
import superstatic from 'superstatic';

import packageJson from '../package.json';

const app = connect();

let config = {
  config: 'superstatic.json',
  cwd: process.cwd(),
  debug: true,
  fallthrough: false,
  gzip: true
};

app.use(superstatic(config));

app.listen(packageJson.config.http.port, function() {
  'use strict';

  const host = this.address().address;
  const port = this.address().port;

  console.log('Superstatic app listening at http://%s:%s', host, port);
});
