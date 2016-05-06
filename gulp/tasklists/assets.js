'use strict';

import gulp from 'gulp';
// import runSequence from 'run-sequence';

// export default function tasklist(callback) {
//   runSequence(
//     'fonts',
//     'icons',
//     // 'rename-spritesheet',
//     'images',
//     'locales',
//     'sounds',
//     'videos',
//     callback
//   );
// }

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
