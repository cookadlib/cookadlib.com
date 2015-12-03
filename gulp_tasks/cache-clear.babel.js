'use strict';

import cache from 'gulp-cached';
import gulp from 'gulp';

gulp.task('cache-clear', () => {
  cache.caches = {};
});
