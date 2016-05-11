'use strict';

import gulp from 'gulp';
import wct from 'web-component-tester';

import * as config from '../config';
import * as helper from '../helper';

export default task;

const namespace = helper.getNamespace(__filename);

let sourceFiles = [
  `${config.directory.source.elements}/elements.html`
];
sourceFiles = sourceFiles.concat(config.files.source.elements);

export function task(done) {
  wct.gulp.init(gulp);
}

export function watch(done) {
  return helper.defineWatcher(namespace, sourceFiles, task);
}

// Load tasks for web-component-tester
// Adds tasks for `gulp test:local` and `gulp test:remote`
