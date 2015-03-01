'use strict';

var path = require('path');

var directory = {};

directory.application = path.resolve(__dirname + '/../../application/');
directory.bowerComponents = path.resolve(__dirname + '/../../bower_components');
directory.nodeModules = path.resolve(__dirname + '/../../node_modules');
directory.public = path.resolve(__dirname + '/../../public/');
directory.root = path.resolve(__dirname + '/../../');

module.exports = directory;
