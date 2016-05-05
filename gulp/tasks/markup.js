'use strict';

import cache from 'gulp-cached';
import debug from 'gulp-debug';
// import filter from 'gulp-filter';
import gulp from 'gulp';
// import htmlhint from 'gulp-htmlhint';
// import htmltidy from 'gulp-htmltidy';
// import minifyHTML from 'gulp-minify-html';
import plumber from 'gulp-plumber';
import polylint from 'gulp-polylint';
import remember from 'gulp-remember';
import size from 'gulp-size';

import {
  config,
  browserSync
  // ,
  // htmlInjector
} from '../config.js';

import helper from '../helper';

let sourceFiles = config.files.source.markup;

sourceFiles = sourceFiles.concat(config.files.source.markupIgnored.map(function(path) {
  return '!' + path;
}));

// let markupHtmlhintFilter = sourceFiles.concat(config.files.source.markupHtmlhintFilter.map(function(path) {
//   return '!' + path;
// }));

// const htmlhintFilter = filter(markupHtmlhintFilter, {
//   restore: true,
//   passthrough: false
// });

export default function task() {
  return gulp.src(sourceFiles)
    .pipe(plumber({
      errorHandler: helper.reportError
    }))
    .pipe(cache('markup')) // only pass through changed files
    .pipe(debug({
      title: 'markup:'
    }))
    // .pipe(htmlhintFilter)
    // .pipe(htmlhint('.htmlhintrc'))
    // .pipe(htmlhint.reporter('htmlhint-stylish'))
    // .pipe(htmlhint.failReporter({
    //   suppress: true
    // }))
    // .pipe(htmlhintFilter.restore)
    // .pipe(htmltidy())
    // .pipe(minifyHTML())
    .pipe(polylint())
    .pipe(polylint.reporter(polylint.reporter.stylishlike))
    .pipe(gulp.dest(config.directory.destination.markup))
    .pipe(remember('markup')) // add back all files to the stream
    .pipe(size({title: 'markup'}))
    .pipe(plumber.stop())
    .on('error', helper.reportError);
}

export function watch() {
  let watcher = gulp.watch(sourceFiles, ['task']);
  // let watcher = gulp.watch(sourceFiles, ['markup'], htmlInjector);

  watcher.on('change', (event) => {
    browserSync.reload();

    if (event.type === 'deleted') { // if a file is deleted, forget about it
      delete cache.caches.markup[event.path];
      remember.forget('markup', event.path);
    }
  });
}

gulp.task('markup', [

], task);

gulp.task('markup:watch', [
  'browser-sync'
], watch);
