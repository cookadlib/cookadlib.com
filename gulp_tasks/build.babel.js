'use strict';

import gulp from 'gulp';
import runSequence from 'run-sequence';

gulp.task('build', ['clean'], (cb) => {
  // Uncomment 'cache-config' after 'rename-index' if you are going to use service workers.
  runSequence(
    'framework',
    'bower',
    'copy',
    'assets',
    [
      'markup',
      'scripts',
      'styles'
    ],
    // 'vulcanize',
    'rename-index',
    'remove-old-build-index',
    'cache-config',
    cb
  );
});
