'use strict';

import cache from 'gulp-cached';
import debug from 'gulp-debug';
import gulp from 'gulp';
import Pageres from 'pageres';
// import {path as phantomjsPath} from 'phantomjs-prebuilt';
import plumber from 'gulp-plumber';
import remember from 'gulp-remember';
import size from 'gulp-size';
// import webshot from 'gulp-webshot';

import config from './_config.babel.js';
import reportError from './_report-error.babel.js';

let sourceFiles = config.files.source.markup;

// let screenSizes = config.instance.webshot.screenSizes;

// let screenshotTasks = Object.keys(screenSizes).map(function(currentValue) {
//   return `screenshots-${currentValue}`;
// });

// screenshotTasks.forEach(function(screenSize) {
//
//   gulp.task(screenSize, () => {
//     return gulp.src(sourceFiles)
//       .pipe(plumber({
//         errorHandler: reportError
//       }))
//       .pipe(debug({
//         title: 'screenshots:'
//       }))
//       .pipe(webshot({
//         // phantomPath: phantomjsPath,
//         dest: config.path.destination.screenshots,
//         root: config.path.source.base,
//         screenSize: screenSizes[screenSize],
//         shotSize: {
//           height: 'window',
//           width: 'window'
//         }
//       }))
//       .pipe(plumber.stop())
//       .on('error', reportError);
//   });
//
// });

// gulp.task('screenshots', screenshotTasks);

let pageres = new Pageres({
  crop: true,
  delay: 2,
  scale: 0.1953125
});

gulp.task('screenshots', () => {
  return gulp.src(sourceFiles)
    .pipe(plumber({
      errorHandler: reportError
    }))
    .pipe(debug({
      title: 'screenshots:'
    }))
    // .pipe(pageres
    // .src(file, ['1024x768'], {
    //   filename: name
    // })
    // .dest(config.path.destination.screenshots + name)
    // .run(function(err) {
    //   console.log(err || 'done');
    // }))
    .pipe(size({title: 'screenshots'}))
    .pipe(plumber.stop())
    .on('error', reportError);
});

gulp.task('screenshots:watch', () => {
  let watcher = gulp.watch(sourceFiles, ['screenshots']);
  watcher.on('change', (event) => {
    browserSync.reload();

    if (event.type === 'deleted') { // if a file is deleted, forget about it
      delete cache.caches.screenshots[event.path];
      remember.forget('screenshots', event.path);
    }
  });
});
