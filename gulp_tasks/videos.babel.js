'use strict';

import cache from 'gulp-cached';
import debug from 'gulp-debug';
import ffmpeg from 'gulp-fluent-ffmpeg';
import gulp from 'gulp';
import plumber from 'gulp-plumber';
import remember from 'gulp-remember';
import size from 'gulp-size';

import {config, browserSync} from './_config.babel.js';
import reportError from './_report-error.babel.js';

let sourceFiles = config.files.source.videos;

gulp.task('videos', () => {
  return gulp.src(sourceFiles)
    .pipe(plumber({
      errorHandler: reportError
    }))
    .pipe(cache('videos')) // only pass through changed files
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
          console.log('videos: Processing finished');
        })
        .on('error', reportError);
    }))
    .pipe(gulp.dest(config.path.destination.base))
    .pipe(remember('videos')) // add back all files to the stream
    .pipe(size({title: 'videos'}))
    .pipe(plumber.stop())
    .on('error', reportError);
});

gulp.task('videos:watch', ['browser-sync'], () => {
  let watcher = gulp.watch(sourceFiles, ['videos']);

  watcher.on('change', (event) => {
    browserSync.reload();

    if (event.type === 'deleted') { // if a file is deleted, forget about it
      delete cache.caches.videos[event.path];
      remember.forget('videos', event.path);
    }
  });
});
