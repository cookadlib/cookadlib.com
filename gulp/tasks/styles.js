'use strict';

// import autoprefixer from 'gulp-autoprefixer';
import autoprefixer from 'autoprefixer';
import cache from 'gulp-cached';
import colorguard from 'colorguard';
// import csscomb from 'gulp-csscomb';
// import cssmin from 'gulp-cssmin';
import cssnano from 'cssnano';
// import csso from 'gulp-csso';
import csswring from 'csswring';
import debug from 'gulp-debug';
import doiuse from 'doiuse';
import filter from 'gulp-filter';
import gulp from 'gulp';
// import gulpIgnore from 'gulp-ignore';
// import minifyCss from 'gulp-minify-css';
import postcss from 'gulp-postcss';
import remember from 'gulp-remember';
// import rtlcss from 'rtlcss';
import sass from 'gulp-sass';
import sassInheritance from 'gulp-sass-inheritance';
import sassLint from 'gulp-sass-lint';
import scss from 'postcss-scss';
import size from 'gulp-size';
import sourcemaps from 'gulp-sourcemaps';
// import stylelint from 'stylelint';
// import uncss from 'gulp-uncss';

import * as config from '../config';
import {browserSync} from '../instances';
import * as helper from '../helper';

let sourceFiles = config.files.source.styles;

sourceFiles = sourceFiles.concat(config.files.source.stylesIgnored.map(function(path) {
  return '!' + path;
}));

export default function task() {
  // stream not returned, see:
  // https://github.com/dlmanning/gulp-sass/wiki/Common-Issues-and-Their-Fixes#gulp-watch-stops-working-on-an-error
  // run from base to include files in elements folder
  gulp.src(sourceFiles)
    .pipe(cache('styles (copy scss)')) // only pass through changed files
    .pipe(debug({
      title: 'styles (copy scss):'
    }))
    .pipe(gulp.dest(config.directory.destination.styles))
    .on('error', helper.reportError);

  gulp.src(sourceFiles)
    .pipe(sourcemaps.init({
      debug: true
      // loadMaps: true
    }))
    .pipe(cache('styles (generate css)')) // only pass through changed files
    .pipe(debug({
      title: 'styles (generate css):'
    }))
    // .pipe(gulpIgnore.exclude(sourceFilesIgnored)) // sass-lint can't process interpolated property selectors
    .pipe(sassLint({
      config: config.directory.root + '/.sass-lint.yml'
    }))
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
    // .pipe(gulpIgnore.include(sourceFiles)) // sass-lint can't process interpolated property selectors
    .pipe(sassInheritance({
      dir: config.directory.source.styles
    })) // returns nothing if the main scss file does not contain any import statements
    .pipe(postcss([
      autoprefixer({
        browsers: ['last 1 version']
      }),
      doiuse,
      colorguard,
      // mqpacker,
      csswring,
      // stylelint,
      // rtlcss,
      cssnano
    ], {
      syntax: scss
    }))
    .pipe(filter(function(file) {
      return !/\/_/.test(file.path) || !/^_/.test(file.relative);
    }))
    .pipe(
      sass({
        errLogToConsole: true,
        includePaths: [
          config.directory.source.bowerComponents,
          config.directory.source.nodeModules
          // config.directory.source.styles
        ]
      })
      .on('error', sass.logError)
    )
    .pipe(remember('styles (generate css)')) // add back all files to the stream
    // .pipe(uncss({
    //   html: [
    //     '**/*.html'
    //   ]
    // }))
    // .pipe(rename({suffix: '.min'}))
    // .pipe(minifyCss())
    .pipe(sourcemaps.write('.')) // Causes the page to be reloaded after the styles are injected.  This was working, I'm not sure what changed.
    .pipe(gulp.dest(config.directory.destination.styles))
    .pipe(browserSync.stream({match: '**/*.css'}))
    .pipe(size({title: 'styles'}))

    .on('error', helper.reportError);
}

export function watch() {
  let watcher = gulp.watch(sourceFiles, ['task']);

  watcher.on('change', (event) => {
    if (event.type === 'deleted') { // if a file is deleted, forget about it
      delete cache.caches.styles[event.path];
      remember.forget('styles', event.path);
    }
  });
}
