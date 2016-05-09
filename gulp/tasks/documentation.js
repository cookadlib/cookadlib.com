'use strict';

import gulp from 'gulp';
import shell from 'gulp-shell';

import * as config from '../config';

let sourceFiles = config.files.source.scripts;

export default function task() {
  shell.task([
    './node_modules/.bin/jsdoc -c ./jsdoc.json'
  ]);
}

export function watch() {
  gulp.watch(sourceFiles, ['task']);
}
