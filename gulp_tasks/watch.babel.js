'use strict';

import gulp from 'gulp';

gulp.task('watch', [
  'framework:watch',
  'bower:watch',
  'assets:watch',
  'copy:watch',
  'locales:watch',
  'markup:watch',
  'scripts:watch',
  'styles:watch',
  'templates:watch',
  'vulcanize:watch',
  'cache-config:watch',
  'browser-sync'
], () => {
  console.info('Watching');
});
