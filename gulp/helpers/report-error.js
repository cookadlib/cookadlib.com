'use strict';

import beeper from 'beeper';
import chalk from 'chalk';
import notify from 'gulp-notify';

export default function reportError(error) {
  let message = (error.lineNumber) ? `Line ${chalk.green(error.lineNumber)} -- ${error.message}` : error.message;

  notify({
    'appIcon': config.file.source.icon,
    'contentImage': config.file.source.icon,
    'message': message,
    'open': 'file://' + config.file.source.icon,
    'title': 'Task Failed [' + error.plugin + ']',
    'sound': 'Sosumi' // See: https://github.com/mikaelbr/node-notifier#all-notification-options-with-their-defaults
  }).write(error);

  beeper();

  // Pretty error reporting
  let report = `
  TASK: ${chalk.red(error.plugin)}
  MESSAGE: ${chalk.green(error.message)}
  `;

  if (error.lineNumber) {
    report += `LINE: ${chalk.green(error.lineNumber)}`;
  }

  if (error.fileName) {
    report += `FILE: ${chalk.blue(error.fileName)}`;
  }

  console.error(report);

  // Prevent the 'watch' task from stopping
  this.emit('end');
}
