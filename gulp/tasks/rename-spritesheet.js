'use strict';

import debug from 'gulp-debug';
import gulp from 'gulp';
import replace from 'gulp-replace';
import rename from 'gulp-rename';

import * as config from '../config';
import * as helper from '../helper';

// console.log('config.directory.source.stylesGenerated', config.directory.source.stylesGenerated);
// console.log('config.file.source.spritesheetTemporary', config.file.source.spritesheetTemporary);
// console.log('config.file.source.spritesheet', config.file.source.spritesheet);

export default function task() {
  return gulp.src(config.file.source.spritesheetTemporary)
    .pipe(debug({
      title: 'rename-spritesheet:'
    }))
    .pipe(replace(config.directory.destination.theme + '/', ''))
    .pipe(rename(config.file.source.spritesheet))
    .pipe(gulp.dest(config.directory.root))
    // .pipe(gulp.dest(config.file.source.spritesheet))
    .on('error', helper.reportError);
}

// gulp.task('rename-spritesheet', [
//
// ], task);
