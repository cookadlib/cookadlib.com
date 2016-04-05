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

let sourceFiles = config.files.source.sounds;

gulp.task('sounds', () => {
  return gulp.src(sourceFiles)
    .pipe(plumber({
      errorHandler: reportError
    }))
    .pipe(cache('sounds')) // only pass through changed files
    .pipe(debug({
      title: 'sounds:'
    }))
    .pipe(ffmpeg('mp4', function(cmd) {
    // .pipe(ffmpeg('m4a', function(cmd) {
    // .pipe(ffmpeg('aac', function(cmd) {
      return cmd
        .addOptions([
          '-movflags frag_keyframe+faststart'
        ])
        .audioBitrate(192)
        .audioChannels(2)
        .audioCodec('libfdk_aac')
        // .audioCodec('libfdk-aac')
        // .audioCodec('libvo_aacenc')
        // .audioCodec('libfaac')
        // .audioCodec('libvo-aacenc')
        // .audioCodec('libmp3lame')
        .audioFrequency(22050)
        .noVideo()
        .on('end', () => {
          console.log('sounds: Processing finished');
        })
        .on('error', reportError);
    }))
    .pipe(gulp.dest(config.path.destination.base))
    .pipe(remember('sounds')) // add back all files to the stream
    .pipe(size({title: 'sounds'}))
    .pipe(plumber.stop())
    .on('error', reportError);
});

gulp.task('sounds:watch', ['browser-sync'], () => {
  let watcher = gulp.watch(sourceFiles, ['sounds']);

  watcher.on('change', (event) => {
    browserSync.reload();

    if (event.type === 'deleted') { // if a file is deleted, forget about it
      delete cache.caches.sounds[event.path];
      remember.forget('sounds', event.path);
    }
  });
});
