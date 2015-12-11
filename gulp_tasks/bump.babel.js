'use strict';

import bump from 'gulp-bump';
import debug from 'gulp-debug';
import gulp from 'gulp';

import config from './_config.babel.js';
import reportError from './_report-error.babel.js';

let v = 'v' + config.version;
let message = 'Release ' + v;

gulp.task('bump', () => {
  return gulp.src(['./package.json', './bower.json'])
    .pipe(debug({
      title: 'bump:'
    }))
    .pipe(bump())
    .pipe(gulp.dest('./'))
    .on('error', reportError);
});
