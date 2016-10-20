# Cook AdLib Website

## Introduction
This repository contains the source code for [The Cook AdLib Website](https://cookadlib.com/)

[![Build Status](https://travis-ci.org/cookadlib/www.cookadlib.com.svg)](https://travis-ci.org/cookadlib/www.cookadlib.com)

### Setup

##### Prerequisites

Install [polymer-cli](https://github.com/Polymer/polymer-cli):

    npm install -g polymer-cli


##### Setup

    yarn

### Start the development server

    polymer serve

### Run web-component-tester tests

    polymer test

### Build

    polymer build

### Test the build

This command serves the minified version of the app in an unbundled state, as it would be served by a push-compatible server:

    polymer serve build/unbundled

This command serves the minified version of the app generated using fragment bundling:

    polymer serve build/bundled

## Notes
`"allow_root": true` in .bowerrc is due to [this issue with moment-recur](https://github.com/c-trimm/moment-recur/issues/47)

## Research

### Technologies
* [Creating great experiences with email markup](https://youtu.be/7uQ87m9RB74?list=PLOU2XLYxmsILOIxBRPPhgYbuSslr50KVq)
* [lovefield](https://google.github.io/lovefield/)

#### Debugging
* [Vorlon.JS](http://vorlonjs.com/)

#### Profiling
* [AppDynamics Application Performance Management](https://www.appdynamics.com/product/application-performance-management/)
* [PM2](http://pm2.keymetrics.io/)

#### Testing
* [Mocha](https://mochajs.org/)
* [w3cjs](https://thomasdavis.github.io/w3cjs/)
* [PhantomJS](http://phantomjs.org/)

#### Code Coverage
* [Istanbul](https://gotwarlost.github.io/istanbul/)

#### Mocking
* [Jest](https://facebook.github.io/jest/)
* [Sinon.JS](http://sinonjs.org/)

#### Web Application Manifest
* [ManifoldJS](http://www.manifoldjs.com/)
