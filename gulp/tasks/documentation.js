'use strict';

import gulp from 'gulp';
import shell from 'gulp-shell';

import config from '../config.js';

let sourceFiles = config.files.source.scripts;

export default function task() {
  shell.task([
    './node_modules/.bin/jsdoc -c ./jsdoc.json'
  ]);
}

export function watch() {
  gulp.watch(sourceFiles, ['task']);
}

gulp.task('documentation', [

], task);

gulp.task('documentation:watch', [
  'browser-sync'
], watch);
