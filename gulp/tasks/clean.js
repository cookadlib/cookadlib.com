'use strict';

import del from 'del';
import gulp from 'gulp';

import config from '../config.js';

export function task() {
  del(config.directory.destination.base, {
    dot: true
  });
}

gulp.task('clean', [
  // 'cache-clear'
], task);
