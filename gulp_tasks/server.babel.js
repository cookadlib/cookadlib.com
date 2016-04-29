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

let sourceFiles = config.files.source.server;

gulp.task('server', () => {
  return gulp.src(sourceFiles)
    .pipe(plumber({
      errorHandler: reportError
    }))
    .pipe(cache('server')) // only pass through changed files
    .pipe(debug({
      title: 'server:'
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
    .pipe(remember('server')) // add back all files to the stream
    // .pipe(uglify())
    // .pipe(concat('app-min.js'))
    // .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write('.', {
      sourceRoot: '/'
    }))
    .pipe(gulp.dest(config.path.destination.server))
    .pipe(size({title: 'server'}))
    .pipe(plumber.stop())
    .on('error', reportError);
});

gulp.task('server:watch', ['browser-sync'], () => {
  let watcher = gulp.watch(sourceFiles, ['server']);

  watcher.on('change', (event) => {
    browserSync.reload();

    if (event.type === 'deleted') { // if a file is deleted, forget about it
      delete cache.caches.server[event.path];
      remember.forget('server', event.path);
    }
  });
});
