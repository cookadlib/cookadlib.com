'use strict';

import gulp from 'gulp';
import runSequence from 'run-sequence';

gulp.task(
  'all',
  (cb) => {
    runSequence(
      [
        'cache-clear',
        'clean'
      ],
      [
        'framework',
        'assets'
      ],
      'build',
      [
        'document',
        'test',
        'pagespeed',
        'watch'
      ],
      cb
    );
  }
);
