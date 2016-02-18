'use strict';

import cache from 'gulp-cached';
import debug from 'gulp-debug';
import gulp from 'gulp';
import plumber from 'gulp-plumber';

import {config, browserSync} from './_config.babel.js';
import reportError from './_report-error.babel.js';

let sourceFiles = config.files.source.miscellaneous;
// sourceFiles = sourceFiles.concat(config.files.source.bowerComponents);
sourceFiles = sourceFiles.concat(config.files.source.customStyles);
sourceFiles = sourceFiles.concat(config.files.source.elements); // remove when using Vulcanize
sourceFiles = sourceFiles.concat(config.files.source.locales);
// sourceFiles = sourceFiles.concat(config.files.source.scriptsIgnored);
// sourceFiles = sourceFiles.concat(config.files.source.templates);
sourceFiles = sourceFiles.concat(config.files.source.translations);

// sourceFiles = sourceFiles.concat(config.files.source.miscellaneousIgnored.map(function(file) {
//   return '!' + file;
// }));

gulp.task('copy', () => {
  return gulp.src(sourceFiles, {
    base: config.path.source.base,
    dot: true
  })
  .pipe(plumber({
    errorHandler: reportError
  }))
  .pipe(cache('copy')) // add back all files to the stream
  .pipe(debug({
    title: 'copy:'
  }))
  .pipe(plumber.stop())
  .pipe(gulp.dest(config.path.destination.base))
  .on('error', reportError);
});

gulp.task('copy:watch', () => {
  gulp.watch(sourceFiles, ['copy'], browserSync.reload);
});
