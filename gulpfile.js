'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass')(require('node-sass')),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer');
let browserSync = require('browser-sync');

gulp.task('sass', function (cb) {
    return gulp.src('./src/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./build'))
        .pipe(browserSync.reload({
            stream: true
        }))
        .on('end', cb);
});

gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: './'
        },
    })
});

gulp.task('start', gulp.series('sass', 'browserSync'));