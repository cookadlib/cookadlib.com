'use strict';

import babel from 'gulp-babel';
import cache from 'gulp-cached';
// import concat from 'gulp-concat';
import debug from 'gulp-debug';
import gulp from 'gulp';
import gulpIf from 'gulp-if';
import jscs from 'gulp-jscs';
import jshint from 'gulp-jshint';
// import modernizr from 'gulp-modernizr';
import plumber from 'gulp-plumber';
import remember from 'gulp-remember';
import size from 'gulp-size';
import sourcemaps from 'gulp-sourcemaps';
// import typescript from 'gulp-tsc';
// import uglify from 'gulp-uglify';

import {config, browserSync} from './_config.babel.js';
import reportError from './_report-error.babel.js';

let sourceFiles = config.files.source.scripts;
// sourceFiles = sourceFiles.concat(config.files.source.markup);
sourceFiles = sourceFiles.concat(config.files.source.scriptsIgnored.map(function(file) {
  return '!' + file;
}));
sourceFiles = sourceFiles.concat(config.files.source.tests.map(function(file) {
  return '!' + file;
}));
sourceFiles = sourceFiles.concat(config.files.source.styleguide.map(function(file) {
  return '!' + file;
}));

gulp.task('scripts', () => {
  // run from base to include files in site root and elements folder
  return gulp.src(sourceFiles)
    .pipe(plumber({
      errorHandler: reportError
    }))
    .pipe(cache('scripts')) // only pass through changed files
    .pipe(debug({
      title: 'scripts:'
    }))
    .pipe(sourcemaps.init({
      debug: true,
      loadMaps: true
    }))
    .pipe(jshint.extract()) // Extract JS from .html files
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(gulpIf(!browserSync.active, jshint.reporter('fail')))
    .pipe(jscs({
      fix: false
    }))
    // .pipe(typescript({
    //   allowimportmodule: true,
    //   target: 'ES6'
    // }))
    .pipe(babel())
    // .pipe(modernizr())
    .pipe(remember('scripts')) // add back all files to the stream
    // .pipe(uglify())
    // .pipe(concat('app-min.js'))
    // .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write('.', {
      sourceRoot: '/'
    }))
    .pipe(plumber.stop())
    .pipe(gulp.dest(config.path.destination.base))
    .pipe(size({title: 'scripts'}))
    .on('error', reportError);
});

gulp.task('scripts:watch', () => {
  let watcher = gulp.watch(sourceFiles, ['scripts'], browserSync.reload);
  // console.log(cache.caches);
  watcher.on('change', (event) => {
    // console.log('change', cache.caches);
    if (event.type === 'deleted') { // if a file is deleted, forget about it
      delete cache.caches.scripts[event.path];
      remember.forget('scripts', event.path);
    }
  });
});
