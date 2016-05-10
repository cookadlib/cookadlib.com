'use strict';

import debug from 'gulp-debug';
// import {path as phantomjsPath} from 'phantomjs-prebuilt';
// import webshot from 'gulp-webshot';
import xray from 'x-ray';

import * as config from '../config';
import * as helper from '../helper';

const defaultNamespace = helper.getNamespace(__filename);

// const x = xray();

let sourceFiles = config.files.source.markup;

export function task(namespace = defaultNamespace) {
  return new xray(`http://localhost:${config.instance.browsersync.port}`, 'title')
  .stream()
  .pipe(debug({
    title: namespace
  }))
  .on('error', helper.reportError);
}

export function watch(namespace = defaultNamespace) {
  return helper.defineWatcher(namespace, sourceFiles, task, true);
}
