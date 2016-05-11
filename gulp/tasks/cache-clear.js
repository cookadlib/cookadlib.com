'use strict';

import cache from 'gulp-cached';
import gulp from 'gulp';

import * as helper from '../helper';

const namespace = helper.getNamespace(__filename);

export function task(done) {
  cache.caches = {};
  done();
}

task.displayName = namespace;
task.description = 'Clear gulp cache';

export default task;
