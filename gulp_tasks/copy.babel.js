'use strict';

import debug from 'gulp-debug';
import gulp from 'gulp';
import plumber from 'gulp-plumber';

import config from './_config.babel.js';
import reportError from './_report-error.babel.js';

let sourceFiles = config.files.source.miscellaneous;
sourceFiles = sourceFiles.concat(config.files.source.customStyles);
sourceFiles = sourceFiles.concat(config.files.source.locales);
sourceFiles = sourceFiles.concat(config.files.source.scriptsIgnored);
sourceFiles = sourceFiles.concat(config.files.source.templates);
sourceFiles = sourceFiles.concat(config.files.source.translations);

sourceFiles = sourceFiles.concat(config.files.source.miscellaneousIgnored.map(function(file) {
  return '!' + file;
}));

gulp.task('copy', () => {
  return gulp.src(sourceFiles, {
    base: config.path.source.base,
    dot: true
  })
  .pipe(plumber({
    errorHandler: reportError
  }))
  .pipe(debug({
    title: 'copy:'
  }))
  .pipe(plumber.stop())
  .pipe(gulp.dest(config.path.destination.base))
  .on('error', reportError);
});

gulp.task('copy:watch', function() {
  gulp.watch(sourceFiles, ['copy']);
});
