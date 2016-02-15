'use strict';

import gulp from 'gulp';
import runSequence from 'run-sequence';

gulp.task('build', ['clean'], function (cb) {
  // Uncomment 'cache-config' after 'rename-index' if you are going to use service workers.
  runSequence(
    'bower-install',
    'copy',
    [
      'markup',
      'scripts',
      'vulcanize'
    ],
    // 'rename-spritesheet',
    'assets',
    [
      // 'elements',
      'styles'
    ],
    'rename-index',
    'remove-old-build-index',
    'cache-config',
    cb
  );
});
