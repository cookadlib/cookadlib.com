'use strict';

import gulp from 'gulp';

export function tasklist() {
  return gulp.series(
    gulp.parallel(
      'fonts',
      'icons',
      // 'renameSpritesheet',
      'images',
      'locales',
      'sounds',
      'videos'
    )
  );
}

export function watch() {
  return gulp.series(
    gulp.parallel(
      'fonts:watch',
      'icons:watch',
      // 'renameSpritesheet:watch',
      'images:watch',
      'locales:watch',
      'sounds:watch',
      'videos:watch'
    )
  );
}
