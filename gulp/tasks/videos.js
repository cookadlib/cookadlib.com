'use strict';

import cache from 'gulp-cached';
import debug from 'gulp-debug';
import ffmpeg from 'gulp-fluent-ffmpeg';
import gulp from 'gulp';
import remember from 'gulp-remember';
import size from 'gulp-size';

import * as config from '../config';
import * as helper from '../helper';

const namespace = helper.getNamespace(__filename);

let sourceFiles = config.files.source.videos;

export function task(done) {
  return gulp.src(sourceFiles, {
      since: gulp.lastRun(namespace)
    })
    .pipe(cache(namespace))
    .pipe(debug({
      title: namespace
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
        // .on('end', () => {
        //   console.log('videos: Processing finished');
        // })
        .on('error', helper.reportError);
    }))
    .pipe(gulp.dest(config.directory.destination.base))
    .pipe(remember(namespace))
    .pipe(size({title: namespace}))
    .on('error', helper.reportError);
}

export function watch(done) {
  return helper.defineWatcher(namespace, sourceFiles, task, true);
}

task.displayName = namespace;
task.description = 'Convert video files';

export default task;
