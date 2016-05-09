'use strict';

import cache from 'gulp-cached';
import debug from 'gulp-debug';
import ffmpeg from 'gulp-fluent-ffmpeg';
import gulp from 'gulp';
import remember from 'gulp-remember';
import size from 'gulp-size';

import * as config from '../config';
import * as helper from '../helper';

const defaultNamespace = helper.getNamespace(__filename);

let sourceFiles = config.files.source.sounds;

export default function task(namespace = defaultNamespace) {
  return gulp.src(sourceFiles)
    .pipe(cache(namespace))
    .pipe(debug({
      title: namespace
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
        // .on('end', () => {
        //   console.log('sounds: Processing finished');
        // })
        .on('error', helper.reportError);
    }))
    .pipe(gulp.dest(config.directory.destination.base))
    .pipe(remember(namespace))
    .pipe(size({title: namespace}))
    .on('error', helper.reportError);
}

export function watch(namespace = defaultNamespace) {
  return helper.defineWatcher(namespace, sourceFiles, task, true);
}
