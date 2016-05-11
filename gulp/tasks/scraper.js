'use strict';

import debug from 'gulp-debug';
// import {path as phantomjsPath} from 'phantomjs-prebuilt';
// import webshot from 'gulp-webshot';
import xray from 'x-ray';

import * as config from '../config';
import * as helper from '../helper';

const namespace = helper.getNamespace(__filename);

const x = xray();

let sourceFiles = config.files.source.markup;

export function task(done) {
  return gulp.serial('browserSync', () => {
    x(`http://localhost:${config.browsersync.port}`, 'title')
    .stream()
    .pipe(debug({
      title: namespace
    }))
    .on('error', helper.reportError);
  })
}

export function watch(done) {
  return helper.defineWatcher(namespace, sourceFiles, task, true)
}

task.displayName = namespace;
task.description = 'Scrape site using x-ray and output to console';

export default task;
