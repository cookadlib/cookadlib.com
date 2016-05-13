'use strict';

import debug from 'gulp-debug';
// import gulp from 'gulp';
// import {path as phantomjsPath} from 'phantomjs-prebuilt';
import phantom from 'x-ray-phantom';
// import webshot from 'gulp-webshot';
import xray from 'x-ray';

import * as config from '../config';
import * as helper from '../helper';

const namespace = helper.getNamespace(__filename);

const x = xray().driver(phantom());

let sourceFiles = config.files.source.markup;

export function task(done) {
  return x(config.server.URL, 'title')
    .stream()
    .paginate('.next_page@href')
    .pipe(debug({
      title: namespace
    }))
    .on('error', helper.reportError);
}

export function watch(done) {
  return helper.defineWatcher(namespace, sourceFiles, task, true);
}

task.displayName = namespace;
task.description = 'Scrape site using x-ray and output to console';

export default task;
