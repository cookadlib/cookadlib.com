'use strict';

import debug from 'gulp-debug';
import run from 'gulp-run';

import * as config from '../config';
import * as helper from '../helper';

const namespace = helper.getNamespace(__filename);

let sourceFiles = config.files.source.scripts;

export function task(done) {
  return run('./node_modules/.bin/jsdoc -c ./jsdoc.json')
    .exec()
    .pipe(debug({
      title: namespace
    }));
}

export function watch(done) {
  return helper.defineWatcher(namespace, sourceFiles, task);
}

task.displayName = namespace;
task.description = 'Generate documentation for JavaScript files using JSDoc';

export default task;
