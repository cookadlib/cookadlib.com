'use strict';

import gulp from 'gulp';

gulp.task('all', [
  'cache-clear',
  'clean',
  'framework',
  'build',
  'assets',
  'document',
  'test',
  'pagespeed',
  'watch'
]);
