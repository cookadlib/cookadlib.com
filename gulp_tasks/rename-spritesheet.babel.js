'use strict';

import debug from 'gulp-debug';
import gulp from 'gulp';
import replace from 'gulp-replace';
import rename from 'gulp-rename';

import config from './_config.babel.js';
import reportError from './_report-error.babel.js';

// console.log('config.path.source.stylesGenerated', config.path.source.stylesGenerated);
// console.log('config.file.source.spritesheetTemporary', config.file.source.spritesheetTemporary);
// console.log('config.file.source.spritesheet', config.file.source.spritesheet);

gulp.task('rename-spritesheet', () => {
  return gulp.src(config.file.source.spritesheetTemporary)
    .pipe(debug({
      title: 'rename-spritesheet:'
    }))
    .pipe(replace(config.path.destination.theme + '/', ''))
    .pipe(rename(config.file.source.spritesheet))
    .pipe(gulp.dest(config.path.root))
    // .pipe(gulp.dest(config.file.source.spritesheet))
    .on('error', reportError);
});
