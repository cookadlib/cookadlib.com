'use strict';

import gulp from 'gulp';

export default function tasklist() {
  return gulp.series(
    gulp.parallel(
      'cache-clear',
      'clean'
    ),
    'framework',
    'assets',
    'build',
    gulp.parallel(
      'document',
      'test',
      'pagespeed',
      'watch'
    )
  );
}
