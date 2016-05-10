'use strict';

import cache from 'gulp-cached';
import debug from 'gulp-debug';
import gulp from 'gulp';
import remember from 'gulp-remember';

import * as config from '../config';
import {browserSync} from '../instances';
import * as helper from '../helper';

const defaultNamespace = helper.getNamespace(__filename);

let sourceFiles = config.files.source.miscellaneous;
// sourceFiles = sourceFiles.concat(config.files.source.bowerComponents);
// sourceFiles = sourceFiles.concat(config.files.source.customStyles);
// sourceFiles = sourceFiles.concat(config.files.source.elements); // remove when using Vulcanize
sourceFiles = sourceFiles.concat(config.files.source.locales);
// sourceFiles = sourceFiles.concat(config.files.source.scriptsIgnored);
// sourceFiles = sourceFiles.concat(config.files.source.templates);
sourceFiles = sourceFiles.concat(config.files.source.translations);
// sourceFiles = sourceFiles.concat(config.files.source.miscellaneousIgnored.map(function(file) {
//   return '!' + file;
// }));

export function task(namespace = defaultNamespace) {
  return gulp.src(sourceFiles, {
    // base: config.directory.source.base,
    dot: true
  })
  .pipe(cache(namespace))
  .pipe(debug({
    title: namespace
  }))
  .pipe(gulp.dest(config.directory.destination.base))
  .on('error', helper.reportError);
}

export function watch(namespace = defaultNamespace) {
  return helper.defineWatcher(namespace, sourceFiles, task, true);
}
