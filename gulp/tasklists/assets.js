'use strict';

import gulp from 'gulp';

export default tasklist;

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

export default function watch() {
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
