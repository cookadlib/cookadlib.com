'use strict';

import git from 'gulp-git';
import gulp from 'gulp';

import config from './_config.babel.js';

let version = 'v' + config.version;
let message = `Release ${version}`;

gulp.task('tag', ['bump'], () => {

  git.tag(version, message, {
    // args: 'signed'
    // cwd: '../'
  }, (err) => {
    if (err) {
      throw err;
    }
  });

  git.push('origin', 'master', {
    args: '--tags',
    // cwd: '../'
  }, function (err) {
    if (err) {
      throw err;
    }
  });

  // git.exec({
  //   args: `release ${version}`
  // }, function (err) {
  //   if (err) throw err;
  // });

});
