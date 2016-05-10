import gulp from 'gulp';

import * as tasks from './gulp/task';
import * as tasksWatch from './gulp/task-watch';
import * as tasklists from './gulp/tasklist';
import * as tasklistsWatch from './gulp/tasklist-watch';

let test1 = tasks.scraper;
let test2 = tasks.scraper();

console.log('tasks', tasks);
console.log('test1', test1);
console.log('test2', test2);

for (const task of Object.keys(tasks)) {
  console.log('task', task, tasks[task]);
  gulp.task(task, tasks[task]);
}

console.log('tasksWatch', tasksWatch);
for (const task of Object.keys(tasksWatch)) {
  console.log('task:watch', task, tasks[task]);
  gulp.task(`${task}:watch`, tasks[task]);
}

console.log('tasklists', tasklists);
for (const tasklist of Object.keys(tasklists)) {
  console.log('tasklist', tasklist, tasklists[tasklist]);
  gulp.task(tasklist, tasklists[tasklist]());
}

console.log('tasklistsWatch', tasklistsWatch);
for (const tasklist of Object.keys(tasklistsWatch)) {
  console.log('tasklist:watch', tasklist, tasklistsWatch[tasklist]);
  gulp.task(`${tasklist}:watch`, tasklistsWatch[tasklist]());
}
