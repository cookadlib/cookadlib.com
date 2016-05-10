'use strict';

import gulp from 'gulp';
import rename from 'gulp-rename';

import * as config from '../config';
import * as helper from '../helper';

export default task;

const defaultNamespace = helper.getNamespace(__filename);

export function task(namespace = defaultNamespace) {
  return gulp.src(config.file.destination.indexBuild)
    .pipe(rename(config.file.destination.index))
    .pipe(gulp.dest(config.directory.destination.base));
}
