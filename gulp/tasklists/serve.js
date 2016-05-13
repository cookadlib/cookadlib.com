'use strict';

import gulp from 'gulp';

import * as helper from '../helper';

import * as tasks from '../task';
import * as tasksWatch from '../task-watch';

const namespace = helper.getNamespace(__filename);

export const tasklist = gulp.parallel(
  tasks.browserSync
);

tasklist.displayName = namespace;
tasklist.description = 'Start Browsersync server';

export default tasklist;
