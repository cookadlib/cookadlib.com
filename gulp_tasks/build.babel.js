'use strict';

import gulp from 'gulp';

gulp.task('build', [
  'copy',
  'markup',
  'scripts',
  'styles',
  // 'generate-service-worker',
  'precache'
]);
