'use strict';

import debug from 'gulp-debug';
import gulp from 'gulp';
import htmlhint from 'gulp-htmlhint';
// import htmltidy from 'gulp-htmltidy';
import minifyHTML from 'gulp-minify-html';
import plumber from 'gulp-plumber';

import {config, browserSync} from './_config.babel.js';
import reportError from './_report-error.babel.js';

const sourceFiles = config.files.markup;

gulp.task('markup', () => {
  return gulp.src(sourceFiles)
    .pipe(plumber())
    .pipe(debug({
      title: 'markup:'
    }))
    .pipe(htmlhint('.htmlhintrc'))
    // .pipe(htmltidy())
    // .pipe(minifyHTML())
    .pipe(gulp.dest(config.path.destination.base))
    .pipe(plumber.stop())
    .on('error', reportError);
});

gulp.task('markup:watch', function() {
  gulp.watch(sourceFiles, ['markup'], browserSync.reload);
});
