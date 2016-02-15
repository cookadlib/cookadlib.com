'use strict';

import gulp from 'gulp';
import runSequence from 'run-sequence';

gulp.task('build', ['clean'], function (cb) {
  // Uncomment 'cache-config' after 'rename-index' if you are going to use service workers.
  runSequence(
    'bower-install',
    'symlinks',
    'copy',
    [
      'icons',
      'scripts',
      'markup',
      'locales'
    ],
    'rename-spritesheet',
    [
      // 'elements',
      'styles'
    ],
    // 'vulcanize',
    'rename-index',
    'remove-old-build-index',
    'assets',
    'cache-config',
    cb
  );
});
