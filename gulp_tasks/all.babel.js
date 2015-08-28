'use strict';

import gulp from 'gulp';

gulp.task('all', [
  'framework',
  'assets',
  'build',
  'document',
  'test',
  'pagespeed'
]);
