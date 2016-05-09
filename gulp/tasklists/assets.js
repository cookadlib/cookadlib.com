'use strict';

import gulp from 'gulp';

export default function tasklist() {
  return gulp.series(
    gulp.parallel(
      'fonts',
      'icons',
      // 'rename-spritesheet',
      'images',
      'locales',
      'sounds',
      'videos'
    )
  );
}
