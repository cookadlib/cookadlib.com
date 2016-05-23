'use strict';

import bower from 'gulp-bower';

import * as config from '../config';
import * as helper from '../helper';

const namespace = helper.getNamespace(__filename);

let sourceFiles = config.files.source.bowerConfiguration;

export function task(done) {
  return bower({
    cmd: 'install',
    verbosity: 1
  })
  .on('end', done)
  .on('error', helper.reportError);
}

export function watch(done) {
  return helper.defineWatcher(namespace, sourceFiles, task, true);
}

task.displayName = namespace;
task.description = 'Run "bower install" command';

export default task;
