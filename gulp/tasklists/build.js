'use strict';

import gulp from 'gulp';

export default tasklist;

export function tasklist() {
  return gulp.series(
    gulp.parallel(
      'bowerInstall',
      'bowerUpdate',
      'copy'
    ),
    gulp.parallel(
      'locales',
      'server',
      'scripts',
      'styles',
      'markup',
      'templates'
    ),
    'vulcanize',
    'renameIndex',
    'removeOldBuildIndex',
    // Uncomment 'cache-config' after 'rename-index' if you are going to use service workers.
    'cacheConfig'
  );
}

export function watch() {
  return gulp.series(
    gulp.parallel(
      'bowerInstall:watch',
      'bowerUpdate:watch',
      'copy:watch'
    ),
    gulp.parallel(
      'locales:watch',
      'server:watch',
      'scripts:watch',
      'styles:watch',
      'markup:watch',
      'templates:watch'
    ),
    'vulcanize:watch',
    'renameIndex:watch',
    'removeOldBuildIndex:watch',
    // Uncomment 'cacheConfig' after 'renameIndex' if you are going to use service workers.
    'cacheConfig:watch'
  );
}
