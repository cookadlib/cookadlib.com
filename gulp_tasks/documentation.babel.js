'use strict';

// import debug from 'gulp-debug';
import gulp from 'gulp';
// import plumber from 'gulp-plumber';
import shell from 'gulp-shell';

// import manifest from '../package.json';
// import reportError from './_report-error.babel.js';

import config from './_config.babel.js';

let sourceFiles = [
  config.files.source.scripts,
  config.files.source.documentation
];

gulp.task('documentation', shell.task([
  '../node_modules/.bin/jsdoc .'
]));

gulp.task('documentation:watch', function() {
  gulp.watch(sourceFiles, ['documentation']);
});