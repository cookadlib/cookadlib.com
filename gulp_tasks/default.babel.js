'use strict';

import gulp from 'gulp';

gulp.task('default', [
  'cache-clear',
  // 'clean',
  'framework',
  'build',
  'assets',
  'watch'
]);
