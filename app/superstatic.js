import connect from 'connect';
import ip from 'ip';
import superstatic from 'superstatic';

import packageJson from '../package.json';

let config = {
  config: '../superstatic.json',
  cwd: process.cwd(),
  debug: true,
  fallthrough: false,
  gzip: true
};

const app = connect();

app.use(superstatic(config));

const server = app.listen(packageJson.config.http.port, () => {
  'use strict';

  const host = server.address().address === '::' ? ip.address() : server.address().address;
  const port = server.address().port;

  console.log(`Superstatic app listening at http://${host}:${port}`);
});
