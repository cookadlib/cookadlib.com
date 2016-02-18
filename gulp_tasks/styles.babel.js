'use strict';

// import autoprefixer from 'gulp-autoprefixer';
import autoprefixer from 'autoprefixer';
import cache from 'gulp-cached';
// import csscomb from 'gulp-csscomb';
// import cssmin from 'gulp-cssmin';
import cssnano from 'cssnano';
import colorguard from 'colorguard';
// import csso from 'gulp-csso';
import debug from 'gulp-debug';
import doiuse from 'doiuse';
import gulp from 'gulp';
// import gulpIgnore from 'gulp-ignore';
// import minifyCss from 'gulp-minify-css';
import plumber from 'gulp-plumber';
import postcss from 'gulp-postcss';
import remember from 'gulp-remember';
import rtlcss from 'rtlcss';
// import sass from 'gulp-sass';
// import sassLint from 'gulp-sass-lint';
import size from 'gulp-size';
import sourcemaps from 'gulp-sourcemaps';
// import stylelint from 'stylelint';
// import uncss from 'gulp-uncss';

import {config, browserSync} from './_config.babel.js';
import reportError from './_report-error.babel.js';

let sourceFiles = config.files.source.styles;

// let sourceFilesIgnored = config.files.source.stylesIgnored;

// console.log('sourceFiles', sourceFiles);
// console.log('sourceFilesIgnored', sourceFilesIgnored);

gulp.task('styles', () => {
  // stream not returned, see:
  // https://github.com/dlmanning/gulp-sass/wiki/Common-Issues-and-Their-Fixes#gulp-watch-stops-working-on-an-error
  // run from base to include files in elements folder
  gulp.src(sourceFiles)
    .pipe(plumber({
      errorHandler: reportError
    }))
    .pipe(cache('styles')) // only pass through changed files
    .pipe(debug({
      title: 'styles:'
    }))
    // .pipe(gulpIgnore.exclude(sourceFilesIgnored)) // sass-lint can't process interpolated property selectors
    // .pipe(sassLint({
    //   config: config.path.root + '/.sass-lint.yml'
    // }))
    // .pipe(sassLint.format())
    // .pipe(sassLint.failOnError())
    // .pipe(gulpIgnore.include(sourceFiles)) // sass-lint can't process interpolated property selectors
    .pipe(sourcemaps.init({
      debug: true,
      loadMaps: true
    }))
    // .pipe(
    //   sass({
    //     errLogToConsole: true,
    //     includePaths: [
    //       config.path.source.bowerComponents,
    //       config.path.source.nodeModules,
    //       config.path.source.styles
    //     ]
    //   })
    //   .on('error', sass.logError)
    // )
    .pipe(remember('styles')) // add back all files to the stream
    .pipe(postcss([
      autoprefixer({
        browsers: ['last 1 version']
      }),
      doiuse,
      colorguard,
      // mqpacker,
      // csswring,
      // stylelint,
      rtlcss,
      cssnano
    ]))
    // .pipe(uncss({
    //   html: [
    //     '**/*.html'
    //   ]
    // }))
    // .pipe(rename({suffix: '.min'}))
    // .pipe(minifyCss())
    .pipe(sourcemaps.write('.')) // Causes the page to be reloaded after the styles are injected.  This was working, I'm not sure what changed.
    .pipe(plumber.stop())
    .pipe(gulp.dest(config.path.destination.styles))
    .pipe(size({title: 'styles'}))
    .pipe(browserSync.stream({match: '**/*.css'}))
    .on('error', reportError);
});

gulp.task('styles:watch', () => {
  let watcher = gulp.watch(sourceFiles, ['styles']);
  // console.log(cache.caches);
  watcher.on('change', function(event) {
    // console.log('change', cache.caches);
    if (event.type === 'deleted') { // if a file is deleted, forget about it
      delete cache.caches.styles[event.path];
      remember.forget('styles', event.path);
    }
  });
});
