'use strict';

import cache from 'gulp-cached';
import debug from 'gulp-debug';
import gulp from 'gulp';
import htmlhint from 'gulp-htmlhint';
// import htmltidy from 'gulp-htmltidy';
// import minifyHTML from 'gulp-minify-html';
import plumber from 'gulp-plumber';
import remember from 'gulp-remember';

import {config, browserSync} from './_config.babel.js';
import reportError from './_report-error.babel.js';

let sourceFiles = config.files.source.markup;

// sourceFiles = sourceFiles.concat(config.files.source.markupIgnored.map(function(file) {
//   return '!' + file;
// }));

gulp.task('markup', () => {
  return gulp.src(sourceFiles)
    .pipe(plumber({
      errorHandler: reportError
    }))
    .pipe(cache('markup')) // only pass through changed files
    .pipe(debug({
      title: 'markup:'
    }))
    .pipe(htmlhint('.htmlhintrc'))
    // .pipe(htmltidy())
    // .pipe(minifyHTML())
    .pipe(gulp.dest(config.path.destination.base))
    .pipe(remember('markup')) // add back all files to the stream
    .pipe(plumber.stop())
    .on('error', reportError);
});

gulp.task('markup:watch', () => {
  gulp.watch(sourceFiles, ['markup'], browserSync.reload);
});
