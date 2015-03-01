'use strict';

// var changed = require('gulp-changed');
var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

var config = require(__dirname + '/_utilities/config').images;

gulp.task('images', function() {
  return gulp.src(config.src)
  .pipe(
    imagemin({
      progressive: true,
      svgoPlugins: [{
        removeViewBox: false}
      ],
      use: [
        pngquant()
      ]
    })
  )
  .pipe(gulp.dest(config.dest));
});
