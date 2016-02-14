'use strict';

import bump from 'gulp-bump';
import debug from 'gulp-debug';
import filter from 'gulp-filter';
import git from 'gulp-git';
import gulp from 'gulp';
import tag_version from 'gulp-tag-version';
import {argv} from 'yargs';

// import config from './_config.babel.js';
import reportError from './_report-error.babel.js';

// gulp.task('tag', () => {
  // let version = 'v' + config.version;
  // let message = `Release ${version}`;

  // git.tag(version, message, {
  //   // args: 'signed'
  // }, (err) => {
  //   if (err) {
  //     throw err;
  //   }
  // });

  // git.push('origin', 'master', {
  //   args: '--tags',
  // }, (err) => {
  //   if (err) {
  //     throw err;
  //   }
  // });

  // git.exec({
  //   args: `release ${version}`
  // }, function (err) {
  //   if (err) throw err;
  // });
//
// });

function increment(importance) {
  // get all the files in which to bump version
  return gulp.src(['./package.json', './bower.json'])
    .pipe(debug({
      title: 'tag:'
    }))
    // bump the version number in those files
    .pipe(bump({
      type: importance
    }))
    // save files back to filesystem
    .pipe(gulp.dest('./'))
    // commit the changed version number
    .pipe(git.commit('bumps package version'))
    // read only one file to get the version number
    .pipe(filter('package.json'))
    // create tag in the repository
    .pipe(tag_version())
    .on('error', reportError);
}

gulp.task('tag', function() {

  switch (argv.version) {
    case 'major':
      return increment('major');
      break;
    case 'minor':
      return increment('minor');
      break;
    case 'patch':
      return increment('patch');
      break;
  }

});

// gulp.task('patch', function() {
//   return increment('patch');
// });
//
// gulp.task('feature', function() {
//   return increment('minor');
// });
//
// gulp.task('release', function() {
//   return increment('major');
// });
