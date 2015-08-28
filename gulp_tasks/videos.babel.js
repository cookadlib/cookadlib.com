'use strict';

import debug from 'gulp-debug';
import ffmpeg from 'gulp-fluent-ffmpeg';
import gulp from 'gulp';
import plumber from 'gulp-plumber';

import config from './_config.babel.js';
import reportError from './_report-error.babel.js';

const sourceFiles = config.files.videos;

gulp.task('videos', () => {
  return gulp.src(sourceFiles)
    .pipe(plumber())
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
        .on('end', function() {
          console.log('sounds: Processing finished');
        })
        .on('error', reportError);
    }))
    .pipe(plumber.stop())
    .pipe(gulp.dest(config.path.destination.base))
    .on('error', reportError);
});

gulp.task('videos:watch', function() {
  gulp.watch(sourceFiles, ['videos']);
});
