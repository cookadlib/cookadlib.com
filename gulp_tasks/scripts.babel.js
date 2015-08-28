'use strict';

import babel from 'gulp-babel';
// import concat from 'gulp-concat';
import debug from 'gulp-debug';
import gulp from 'gulp';
// import gulpif from 'gulp-if';
import jscs from 'gulp-jscs';
import jshint from 'gulp-jshint';
// import modernizr from 'gulp-modernizr';
import plumber from 'gulp-plumber';
import sourcemaps from 'gulp-sourcemaps';
// import typescript from 'gulp-tsc';
import uglify from 'gulp-uglify';

import config from './_config.babel.js';
import reportError from './_report-error.babel.js';

const sourceFiles = config.files.scripts;

gulp.task('scripts', () => {
  // run from base to include files in site root and elements folder
  return gulp.src(sourceFiles)
    .pipe(plumber())
    .pipe(debug({
      title: 'scripts:'
    }))
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    // .pipe(gulpif(!browserSync.active, jshint.reporter('fail')))
    .pipe(sourcemaps.init())
    .pipe(jscs({
      fix: true
    }))
    // .pipe(typescript({
    //   allowimportmodule: true,
    //   target: 'ES6'
    // }))
    .pipe(babel())
    // .pipe(concat('app-min.js'))
    // .pipe(modernizr())
    .pipe(uglify())
    .pipe(sourcemaps.write('./maps'))
    .pipe(plumber.stop())
    .pipe(gulp.dest(config.path.destination.base))
    .on('error', reportError);
});

gulp.task('scripts:watch', function() {
  gulp.watch(sourceFiles, ['scripts']);
});
