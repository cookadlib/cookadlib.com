'use strict';

import gulp from 'gulp';
import rename from 'gulp-rename';

import * as config from '../config';
import * as helper from '../helper';

const namespace = helper.getNamespace(__filename);

export function task(done) {
  return gulp.src(config.file.destination.indexBuild)
    .pipe(rename(config.file.destination.index))
    .pipe(gulp.dest(config.directory.destination.base));
}

task.displayName = namespace;
task.description = 'Rename temorary index.html build file';

export default task;
