'use strict';

import gulp from 'gulp';

import * as helper from '../helper';

import * as tasks from '../task';
import * as tasksWatch from '../task-watch';

const namespace = helper.getNamespace(__filename);

export const tasklist = gulp.series(
  tasks.bowerInstall,
  gulp.parallel(
    tasks.bowerUpdate,
    tasks.symlinks
  ),
  gulp.parallel(
    tasks.copy,
    tasks.server,
    tasks.scripts,
    tasks.styles,
    tasks.markup,
    tasks.templates
  ),
  tasks.vulcanize,
  // Uncomment 'cache-config' after 'rename-index' if you are going to use service workers.
  tasks.cacheConfig
);

export const watch = gulp.series(
  tasksWatch.bowerInstall,
  gulp.parallel(
    tasksWatch.bowerUpdate,
    tasksWatch.symlinks
  ),
  gulp.parallel(
    tasksWatch.copy,
    tasksWatch.server,
    tasksWatch.scripts,
    tasksWatch.styles,
    tasksWatch.markup,
    tasksWatch.templates
  ),
  tasksWatch.vulcanize,
  // Uncomment 'cacheConfig' after 'renameIndex' if you are going to use service workers.
  tasksWatch.cacheConfig
);

tasklist.displayName = namespace;
tasklist.description = 'Process code';

export default tasklist;
