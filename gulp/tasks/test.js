'use strict';

import gulp from 'gulp';
import wct from 'web-component-tester';

import * as config from '../config';
import * as helper from '../helper';

const defaultNamespace = helper.getNamespace(__filename);

let sourceFiles = [
  `${config.directory.source.elements}/elements.html`
];
sourceFiles = sourceFiles.concat(config.files.source.elements);

export default function task(namespace = defaultNamespace) {
  wct.gulp.init(gulp);
}

export function watch(namespace = defaultNamespace) {
  return helper.defineWatcher(namespace, sourceFiles, task);
}

// Load tasks for web-component-tester
// Adds tasks for `gulp test:local` and `gulp test:remote`
