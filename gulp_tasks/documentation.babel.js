'use strict';

// import debug from 'gulp-debug';
import gulp from 'gulp';
// import plumber from 'gulp-plumber';
import shell from 'gulp-shell';

// import manifest from '../package.json';
// import reportError from './_report-error.babel.js';

import config from './_config.babel.js';

// let sourceFiles = config.files.source.markup;
// sourceFiles = sourceFiles.concat(config.files.source.scripts);
// sourceFiles = sourceFiles.concat(config.files.source.styles);
// sourceFiles = sourceFiles.concat(config.files.source.templates);

let sourceFiles = config.files.source.scripts;

gulp.task('documentation', shell.task([
  './node_modules/.bin/jsdoc app -r -d docs'
]));

gulp.task('documentation:watch', () => {
  gulp.watch(sourceFiles, ['documentation']);
});
