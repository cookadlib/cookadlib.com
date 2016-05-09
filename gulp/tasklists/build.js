'use strict';

import gulp from 'gulp';

export default function tasklist() {
  return gulp.series(
    gulp.parallel(
      'bower',
      'copy'
    ),
    gulp.parallel(
      'markup',
      'scripts',
      'server',
      'styles',
      'templates'
    ),
    'vulcanize',
    'renameIndex',
    'removeOldBuildIndex',
    // Uncomment 'cache-config' after 'rename-index' if you are going to use service workers.
    'cacheConfig'
  );
}
