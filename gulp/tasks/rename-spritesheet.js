'use strict';

import debug from 'gulp-debug';
import gulp from 'gulp';
import replace from 'gulp-replace';
import rename from 'gulp-rename';

import * as config from '../config';
import * as helper from '../helper';

export default task;

const namespace = helper.getNamespace(__filename);

export function task(done) {
  return gulp.src(config.file.source.spritesheetTemporary)
    .pipe(debug({
      title: namespace
    }))
    .pipe(replace(config.directory.destination.theme + '/', ''))
    .pipe(rename(config.file.source.spritesheet))
    .pipe(gulp.dest(config.directory.root))
    // .pipe(gulp.dest(config.file.source.spritesheet))
    .on('error', helper.reportError);
}
