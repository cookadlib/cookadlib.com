'use strict';

import gulp from 'gulp';
import shell from 'gulp-shell';

import * as config from '../config';
import * as helper from '../helper';

const defaultNamespace = helper.getNamespace(__filename);

let sourceFiles = config.files.source.scripts;

export function task(namespace = defaultNamespace) {
  shell.task([
    './node_modules/.bin/jsdoc -c ./jsdoc.json'
  ]);
}

export function watch(namespace = defaultNamespace) {
  return helper.defineWatcher(namespace, sourceFiles, task);
}
