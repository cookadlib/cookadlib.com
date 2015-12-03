'use strict';

import cache from 'gulp-cached';
import del from 'del';
import gulp from 'gulp';

import config from './_config.babel.js';

gulp.task('clean', () => {
  cache.caches = {};

  del(config.path.destination.base, {
    dot: true
  });
});
