import gulp from 'gulp';

import * as tasks from './gulp/task';
import * as tasksWatch from './gulp/task-watch';
import * as tasklists from './gulp/tasklist';
import * as tasklistsWatch from './gulp/tasklist-watch';

for (const task of Object.keys(tasks)) {
  // console.log('task', task, tasks[task]);
  gulp.task(task, tasks[task]);
}

for (const task of Object.keys(tasksWatch)) {
  // console.log('task:watch', task, tasks[task]);
  gulp.task(`${task}:watch`, tasks[task]);
}

for (const tasklist of Object.keys(tasklists)) {
  // console.log('tasklist', tasklist, tasklists[tasklist]);
  gulp.task(tasklist, tasklists[tasklist]);
}

for (const tasklist of Object.keys(tasklistsWatch)) {
  // console.log('tasklist:watch', tasklist, tasklistsWatch[tasklist]);
  gulp.task(`${tasklist}:watch`, tasklistsWatch[tasklist]);
}
