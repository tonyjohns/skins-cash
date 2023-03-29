var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');

// Static Server + watching scss/html files
gulp.task('serve', gulp.series('sass', function () {

    browserSync.init({
        server: "./"
    });

    gulp.watch("./src/scss/*.scss", ['sass']);
    gulp.watch("./*.html").on('change', browserSync.reload);
}));

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function () {
    return gulp.src("./src/scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("./build"))
        .pipe(browserSync.stream());
});

gulp.task('start', gulp.series('sass', 'serve'));