'use strict';

var gulp      = require('gulp'),
  browserify  = require('browserify'),
  babelify    = require('babelify'),
  source      = require('vinyl-source-stream'),
  plumber     = require('gulp-plumber'),
  concat      = require('gulp-concat'),
  sass        = require('gulp-sass'),
  browserSync = require('browser-sync').create(),
  glob        = require('glob');

// Static Server + watching scss/html files
gulp.task('serve', ['sass', 'jsx'], function() {

  browserSync.init({
      server: "./dist"
  });

  gulp.watch("./app/jsx/**/*.jsx", ['jsx']);
  gulp.watch("./dist/js/bundle.js").on("change", browserSync.reload);
  gulp.watch("./app/sass/**/*.scss", ['sass']);
  gulp.watch("./dist/*.html").on('change', browserSync.reload);
});

gulp.task('sass', function() {
  return gulp.src("./app/sass/**/*.scss")
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('main.css')) 
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream());
});

gulp.task('html', function() {
  return gulp.src("./app/index.html")
    .pipe(gulp.dest('./dist'));
});

gulp.task('font', function() {
  return gulp.src("./app/font/**/*")
    .pipe(gulp.dest('./dist/font'));
});

gulp.task('jsx', function () {

  var allFiles = glob.sync('./app/jsx/**/*.jsx');

  return browserify({ 
    entries: [allFiles], 
    extensions: ['.jsx'],
    debug: true
  })
  .transform('babelify', {presets: ['es2015', 'react']})
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(plumber())
  .pipe(gulp.dest('./dist/js'));

});

gulp.task('default', ['serve', 'html', 'font']);