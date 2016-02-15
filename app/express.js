'use strict';

import appengine from 'appengine';
import express from 'express';

import packageJson from '../package.json';

const app = express();

app.use(appengine.middleware.base);

app.get('/', function(req, res) {
  res.status(200).send('Hello, world!');
});

app.get('/_ah/health', function(req, res) {
  res.set('Content-Type', 'text/plain');
  res.send(200, 'ok');
});

app.get('/_ah/start', function(req, res) {
  res.set('Content-Type', 'text/plain');
  res.send(200, 'ok');
});

app.get('/_ah/stop', function(req, res) {
  res.set('Content-Type', 'text/plain');
  res.send(200, 'ok');
  process.exit();
});

app.get('/hello', function(req, res) {
  let env = req.appengine.devappserver ? 'the dev appserver' : 'production';
  res.send('Hello, world from ' + env + '!');
});

// app.listen(8080, '0.0.0.0');

app.listen(packageJson.config.http.port, function() {
  const host = this.address().address;
  const port = this.address().port;

  console.log('App listening at http://%s:%s', host, port);
});
