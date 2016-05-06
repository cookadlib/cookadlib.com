import ip from 'ip';
import {server as superstatic} from 'superstatic';

import packageJson from '../package.json';

let config = {
  config: '../superstatic.json',
  debug: true,
  // errorPage: 'error.html',
  gzip: true,
  // host: packageJson.name,
  port: packageJson.config.http.port
};

const app = superstatic(config);

const server = app.listen(() => {
  'use strict';

  const host = server.address().address === '::' ? ip.address() : server.address().address;
  const port = server.address().port;

  console.log(`Superstatic app listening at http://${host}:${port}`);
});
