'use strict';

import debug from 'gulp-debug';
import dss from 'gulp-dss';
import gulp from 'gulp';
import plumber from 'gulp-plumber';

import config from './_config.babel.js';
import reportError from './_report-error.babel.js';

let sourceFiles = config.files.source.styles;

gulp.task('styleguide', () => {
  return gulp.src(sourceFiles)
    .pipe(plumber({
      errorHandler: reportError
    }))
    .pipe(debug({
      title: 'styleguide:'
    }))
    .pipe(dss({
      output: 'index.html',
      templatePath: config.path.source.styleguide + '/templates'
    }))
    .pipe(plumber.stop())
    .pipe(gulp.dest(config.path.destination.styleguide))
    .on('error', reportError);
});

gulp.task('styleguide:watch', () => {
  gulp.watch(sourceFiles, ['styleguide']);
});
