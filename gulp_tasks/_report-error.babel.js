'use strict';

import notify from 'gulp-notify';
import util from 'gulp-util';

var reportError = function(error) {
  let lineNumber = (error.lineNumber) ? 'LINE ' + error.lineNumber + ' -- ' : '';

  notify({
    title: 'Task Failed [' + error.plugin + ']',
    message: lineNumber + 'See console.',
    sound: 'Sosumi' // See: https://github.com/mikaelbr/node-notifier#all-notification-options-with-their-defaults
  }).write(error);

  util.beep(); // Beep 'sosumi' again

  // Inspect the error object
  //console.log(error);

  // Easy error reporting
  //console.log(error.toString());
  //util.log(error.toString());

  // Pretty error reporting
  let report = '';
  let chalk = util.colors.white.bgRed;

  report += chalk('TASK:') + ' [' + error.plugin + ']\n';
  report += chalk('PROB:') + ' ' + error.message + '\n';

  if (error.lineNumber) {
    report += chalk('LINE:') + ' ' + error.lineNumber + '\n';
  }

  if (error.fileName)   {
    report += chalk('FILE:') + ' ' + error.fileName + '\n';
  }

  console.error(report);

  // Prevent the 'watch' task from stopping
  this.emit('end');
}

export default reportError;
