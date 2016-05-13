'use strict';

import gulp from 'gulp';

import * as helper from '../helper';

import * as tasks from '../task';
import * as tasksWatch from '../task-watch';

const namespace = helper.getNamespace(__filename);

export const tasklist = gulp.parallel(
  tasks.fonts,
  tasks.images,
  tasks.spritesheetGenerate,
  tasks.spritesheetRename,
  tasks.locales,
  tasks.sounds,
  tasks.videos
);

export const watch = gulp.parallel(
  tasksWatch.fonts,
  tasksWatch.images,
  tasksWatch.spritesheetGenerate,
  tasksWatch.spritesheetRename,
  tasksWatch.locales,
  tasksWatch.sounds,
  tasksWatch.videos
);

tasklist.displayName = namespace;
tasklist.description = 'Process assets';

export default tasklist;
