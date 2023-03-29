const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();

// Sass compilation task
gulp.task('sass', () => {
    return gulp.src('./src/scss/*.scss')
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(gulp.dest('./build'))
        .pipe(browserSync.stream());
});

// Watch task
gulp.task('watch', () => {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });

    gulp.watch('./src/scss/**/*.scss', gulp.series('sass'));
    gulp.watch('./*.html').on('change', browserSync.reload);
});

// Default task
gulp.task('start', gulp.series('sass', 'watch'));
