'use strict';

import gulp from 'gulp';

import * as helper from '../helper';

import * as tasks from '../task';
import * as tasksWatch from '../task-watch';
import * as tasklists from '../tasklist';
import * as tasklistsWatch from '../tasklist-watch';

const namespace = helper.getNamespace(__filename);

export const tasklist = gulp.series(
  gulp.parallel(
    tasks.cacheClear,
    tasks.clean
  ),
  tasklists.framework,
  tasklists.assets,
  tasklists.code,
  tasks.browserSync,
  gulp.parallel(
    tasks.test,
    tasks.documentation,
    tasks.styleguide,
    tasks.screenshots,
    tasks.scraper,
    tasks.pagespeed
  )
);

export const watch = gulp.series(
  tasklistsWatch.framework,
  tasklistsWatch.assets,
  tasklistsWatch.code,
  tasks.browserSync,
  gulp.parallel(
    tasksWatch.test,
    tasksWatch.documentation,
    tasksWatch.styleguide,
    tasksWatch.screenshots,
    tasksWatch.scraper,
    tasksWatch.pagespeed
  )
);

tasklist.displayName = namespace;
tasklist.description = 'Run all tasks';

export default tasklist;
