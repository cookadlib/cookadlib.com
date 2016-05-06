'use strict';

import gulp from 'gulp';
// import runSequence from 'run-sequence';

// export default function tasklist(callback) {
//   runSequence(
//     'all',
//     callback
//   );
// }

export default function tasklist() {
  return gulp.series(
    'all'
  );
}
