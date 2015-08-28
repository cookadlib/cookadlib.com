'use strict';

import debug from 'gulp-debug';
import gulp from 'gulp';
import plumber from 'gulp-plumber';
import shell from 'gulp-shell';

import manifest from '../package.json';
import reportError from './_report-error.babel.js';

import config from './_config.babel.js';

const sourceFiles = [
  config.files.scripts,
  config.files.documentation
];

gulp.task('documentation', shell.task([
  '../node_modules/jsdoc/jsdoc .'
]));

gulp.task('documentation:watch', function() {
  gulp.watch(sourceFiles, ['documentation']);
});
