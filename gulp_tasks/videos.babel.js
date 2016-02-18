'use strict';

import debug from 'gulp-debug';
import ffmpeg from 'gulp-fluent-ffmpeg';
import gulp from 'gulp';
import plumber from 'gulp-plumber';
import size from 'gulp-size';

import {config, browserSync} from './_config.babel.js';
import reportError from './_report-error.babel.js';

let sourceFiles = config.files.source.videos;

gulp.task('videos', () => {
  return gulp.src(sourceFiles)
    .pipe(plumber({
      errorHandler: reportError
    }))
    .pipe(debug({
      title: 'videos:'
    }))
    .pipe(ffmpeg('mp4', function(cmd) {
      return cmd
        .audioBitrate(192)
        .audioChannels(2)
        .audioCodec('libfdk_aac')
        // .audioCodec('libfdk-aac')
        // .audioCodec('libvo_aacenc')
        // .audioCodec('libfaac')
        // .audioCodec('libvo-aacenc')
        // .audioCodec('libmp3lame')
        .audioFrequency(22050)
        .fps(24)
        .videoBitrate('512k')
        .videoCodec('libx264')
        .on('end', () => {
          console.log('sounds: Processing finished');
        })
        .on('error', reportError);
    }))
    .pipe(plumber.stop())
    .pipe(gulp.dest(config.path.destination.base))
    .pipe(size({title: 'videos'}))
    .on('error', reportError);
});

gulp.task('videos:watch', () => {
  gulp.watch(sourceFiles, ['videos'], browserSync.reload);
});
