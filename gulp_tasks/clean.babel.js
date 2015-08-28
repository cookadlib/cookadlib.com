'use strict';

import del from 'del';
import gulp from 'gulp';

import config from './_config.babel.js';

gulp.task('clean', () =>
  del(config.path.destination.base, {
    dot: true
  })
);
