'use strict';

import del from 'del';
import gulp from 'gulp';

import * as config from '../config';

export default function task() {
  del(config.directory.destination.base, {
    dot: true
  });
}

// gulp.task('clean', [
//
// ], task);
