/**
 * Concatenates all the JS files into one file
 * Goes from Typescript -> JS -> Minified & Bundled JS
 */

const { src, dest, watch } = require('gulp');
const replace = require('gulp-replace');
const minifyJs = require('gulp-uglify');
const concat = require('gulp-concat');
const gulpIgnore = require('gulp-ignore');

// Order of the files that they get concatenated in
const JsFiles = [
  'partial/js/ts/docs.js',
  'partial/js/ts/mode/mode.js',
  'partial/js/**/*.js',
];

const matchExports = new RegExp(/export{[A-Za-z0-9_.,$]*};/gim);
const matchImports = new RegExp(
  /import{[A-Za-z0-9_.,$]*}from"[A-Za-z0-9_./-]*";/gim
);
const matchUseStrict = new RegExp(/"use strict";/gim);

const miniBundle = () => {
  return (
    src(JsFiles)
      .pipe(minifyJs())
      .pipe(concat('main.min.js'))
      .pipe(replace(matchImports, ''))
      .pipe(replace(matchExports, ''))
      .pipe(replace(matchUseStrict, ''))
      // .pipe(replace(matchConsoleLogs, '')) Todo: turn on to remove console.logs
      .pipe(dest('dist/js'))
  );
};

const bundle = () => {
  return (
    src(JsFiles)
      .pipe(concat('main.js'))
      .pipe(replace(matchImports, ''))
      .pipe(replace(matchUseStrict, ''))
      .pipe(replace(matchExports, ''))
      // .pipe(replace(matchConsoleLogs, '')) Todo: turn on to remove console.logs
      .pipe(dest('dist/js'))
  );
};

const watchJs = () => watch('**.*.ts', miniBundle);

exports.miniBundle = miniBundle;
exports.bundle = bundle;
exports.watchJs = watchJs;
