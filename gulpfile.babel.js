import gulp from 'gulp';

import * as tasklists from './gulp/tasklist';
import * as tasks from './gulp/task';
import * as watches from './gulp/watch';

for (const task of Object.keys(tasks)) {
  console.log('task', task, tasks[task]);
  gulp.task(
    task,
    tasks[task]()
  );
}

// for (const task of Object.keys(watches)) {
//   console.log('watch', task);
//   gulp.task(
//     `${task}:watch`,
//     tasks[task]()
//   );
// }

// for (const tasklist of Object.keys(tasklists)) {
//   console.log('tasklist', tasklist);
//   gulp.task(
//     tasklist,
//     tasklists[tasklist]()
//   );
// }

// for (const tasklist of Object.keys(tasklists)) {
//   console.log('tasklist watch', tasklist);
//   gulp.task(
//     `${tasklist}:watch`,
//     tasklists[tasklist]()
//   );
// }

console.log('gulp.tree', gulp.tree);
