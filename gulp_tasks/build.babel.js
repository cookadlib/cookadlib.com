'use strict';

import gulp from 'gulp';
import runSequence from 'run-sequence';

gulp.task(
    // 'clean',
  'build',
  (cb) => {
  runSequence(
    'bower',
    'copy',
    [
      'markup',
      'scripts',
      'styles',
      'templates'
    ],
    'vulcanize',
    'rename-index',
    'remove-old-build-index',
    // Uncomment 'cache-config' after 'rename-index' if you are going to use service workers.
    'cache-config',
    cb
  );
});
