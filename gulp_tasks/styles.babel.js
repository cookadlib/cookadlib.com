'use strict';

import autoprefixer from 'gulp-autoprefixer';
import cached from 'gulp-cached';
import csscomb from 'gulp-csscomb';
import csso from 'gulp-csso';
import debug from 'gulp-debug';
import gulp from 'gulp';
import plumber from 'gulp-plumber';
import remember from 'gulp-remember';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
// import uncss from 'gulp-uncss';

import {config, browserSync} from './_config.babel.js';
import reportError from './_report-error.babel.js';

const sourceFiles = config.files.styles;

gulp.task('styles', () => {
  // stream not returned, see:
  // https://github.com/dlmanning/gulp-sass/wiki/Common-Issues-and-Their-Fixes#gulp-watch-stops-working-on-an-error
  // run from base to include files in elements folder
  gulp.src(sourceFiles)
    .pipe(plumber())
    .pipe(debug({
      title: 'styles:'
    }))
    .pipe(cached('styles')) // only pass through changed files
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        includePaths: [
          config.path.bowerComponents,
          config.path.nodeModules,
          config.path.styles
        ]
      })
      .on('error', sass.logError)
    )
    .pipe(autoprefixer())
    .pipe(csscomb())
    .pipe(csso())
    // .pipe(uncss({
    //   html: [
    //     'index.html',
    //     'posts/**/*.html',
    //     'http://example.com'
    //   ]
    // }))
    .pipe(remember('styles')) // add back all files to the stream
    // .pipe(sourcemaps.write('./maps')) // Causes the page to be reloaded after the styles are injected.  This was working, I'm not sure what changed.
    .pipe(plumber.stop())
    .pipe(gulp.dest(config.path.destination.base))
    .pipe(browserSync.stream({match: '**/*.css'}))
    .on('error', reportError);
});

gulp.task('styles:watch', function() {
  var watcher = gulp.watch(sourceFiles, ['styles']);
  console.log(cached.caches);
  watcher.on('change', function(event) {
    console.log('change', cached.caches);
    if (event.type === 'deleted') { // if a file is deleted, forget about it
      delete cached.caches.styles[event.path];
      remember.forget('styles', event.path);
    }
  });
});
