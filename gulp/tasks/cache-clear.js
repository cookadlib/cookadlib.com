'use strict';

import cache from 'gulp-cached';
import gulp from 'gulp';

export default function task() {
  cache.caches = {};
}
