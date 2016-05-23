'use strict';

import del  from 'del';

import * as config from '../config';
import * as helper from '../helper';

const namespace = helper.getNamespace(__filename);

export function task(done) {
  return del([
    config.directory.destination.base
  ]);
}

task.displayName = namespace;
task.description = 'Clean build target directory';

export default task;
