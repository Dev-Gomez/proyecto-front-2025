'use strict';

const { src, dest, watch, series, parallel } = require('gulp');

const sass        = require('gulp-sass')(require('sass'));
const cssmin      = require('gulp-cssmin');
const rename      = require('gulp-rename');
const concat      = require('gulp-concat');
const imagemin    = require('gulp-imagemin');
const uglify      = require('gulp-uglify');
const prefix      = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();

const config = require('./awesomeplate.config.json');

// Tarea: CSS
function css() {
  return src(config.css)
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(prefix('last 2 versions'))
    .pipe(cssmin())
    .pipe(concat('style.css', { newLine: '' }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest('dist/css'))
    .pipe(browserSync.stream());
}

// Tarea: JS
function js() {
  return src(config.js)
    .pipe(uglify({ mangle: false }))
    .pipe(concat('script.js', { newLine: '' }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest('dist/js'))
    .pipe(browserSync.stream());
}

// Tarea: Imágenes
function img() {
  return src('src/img/**/*.+(png|jpg|jpeg|gif|svg)')
    .pipe(imagemin())
    .pipe(dest('dist/img'));
}

// Tarea: Videos
function video() {
  return src('src/video/**/*.+(mp4|mpeg|mov|avi)')
    .pipe(dest('dist/video'));
}

// Tarea: Fonts
function fonts() {
  return src('src/fonts/**/*.+(eot|ttf|woff|woff2)')
    .pipe(dest('dist/fonts'));
}

// Tarea: Servidor
function serve(done) {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
  done();
}

// Tarea: Watch
function watchFiles() {
  watch('src/sass/**/*.scss', css);
  watch('src/js/**/*.js', js);
  watch('src/img/**/*.+(png|jpg|jpeg|gif|svg)', img);
  watch('src/video/**/*.+(mp4|mpeg|mov|avi)', video);
  watch('./awesomeplate.config.json', series(css, js));
}

exports.css = css;
exports.js = js;
exports.img = img;
exports.video = video;
exports.fonts = fonts;
exports.serve = serve;
exports.watch = series(serve, watchFiles);
exports.default = parallel(css, js, img, video, fonts, serve, watchFiles);
