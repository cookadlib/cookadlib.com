'use strict';

// import debug from 'gulp-debug';
import Pageres from 'pageres';
// import {path as phantomjsPath} from 'phantomjs-prebuilt';
// import size from 'gulp-size';
// import webshot from 'gulp-webshot';

import * as config from '../config';
import * as helper from '../helper';

export default task;

const namespace = helper.getNamespace(__filename);

let sourceFiles = config.files.source.markup;

export function task(done) {
  return new Pageres({
      delay: 2
    })
    .src(`http://localhost:${config.browsersync.port}`, config.screenshots.sizes, {
      crop: true
    })
    // .src('todomvc.com', ['1280x1024', '1920x1080'])
    .dest(config.directory.destination.screenshots)
    .run();
}

export function watch(done) {
  return helper.defineWatcher(namespace, sourceFiles, task, true);
}
