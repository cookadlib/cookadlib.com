import gulp from 'gulp';

import * as tasks from './gulp/task';
import * as tasksWatch from './gulp/task-watch';
import * as tasklists from './gulp/tasklist';
import * as tasklistsWatch from './gulp/tasklist-watch';

import * as all from './gulp/tasklists/all';

for (const task of Object.keys(tasks)) {
  gulp.task(task, tasks[task]);
}

for (const task of Object.keys(tasksWatch)) {
  gulp.task(`${task}:watch`, tasks[task]);
}

for (const tasklist of Object.keys(tasklists)) {
  gulp.task(tasklist, tasklists[tasklist]);
}
//
for (const tasklist of Object.keys(tasklistsWatch)) {
  gulp.task(`${tasklist}:watch`, tasklistsWatch[tasklist]);
}

gulp.task('all', all.task);
gulp.task('all:watch', all.task);

gulp.task('default', all.task);
gulp.task('default:watch', all.watch);
