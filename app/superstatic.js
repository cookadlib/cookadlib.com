import connect from 'connect';
import superstatic from 'superstatic';

import packageJson from '../package.json';

const app = connect();

app.use(superstatic({
  config: 'superstatic.json',
  cwd: process.cwd(),
  // env: '../env.json',
  // errorPage: '404.html',
  fallthrough: false
}));


// app.use(superstatic({
//   config: {
//     public: './app',
//     rewrites: [{
//       source: '**',
//       destination: '/index.html'
//     }]
//   },
//   cwd: process.cwd()
// }));

app.listen(packageJson.config.http.port, function() {
  'use strict';

  const host = this.address().address;
  const port = this.address().port;

  console.log('Superstatic app listening at http://%s:%s', host, port);
});
