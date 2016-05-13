'use strict';

import browsersync from './browser-sync';

export let server = {};

server.protocol = 'http';
server.host = `localhost:${browsersync.port}`;
server.URL = `${server.protocol}://${server.host}`;

export default server;
