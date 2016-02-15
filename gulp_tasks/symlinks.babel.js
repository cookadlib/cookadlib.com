'use strict';

import debug from 'gulp-debug';
import gulp from 'gulp';
import symlink from 'gulp-sym';
import reportError from './_report-error.babel.js';

import config from './_config.babel.js';

gulp.task('symlinks', () => {
  // gulp.src(config.path.source.bowerComponents)
  //   .pipe(debug({
  //     title: 'symlinks:'
  //   }))
  //   .pipe(symlink(config.path.destination.bowerComponents))
  //   .on('error', reportError);

  gulp.src(config.path.source.nodeModules)
    .pipe(debug({
      title: 'symlinks:'
    }))
    .pipe(symlink(config.path.destination.nodeModules))
    .on('error', reportError);
});
