'use strict';

const gulp = require('gulp'),
    glp = require('gulp-load-plugins')(),
    browserSync = require('browser-sync').create();

gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: "./build"
        }
    });
});

gulp.task('pug', function () {
    return gulp.src('src/pug/*.pug')
        .pipe(glp.pug({
            pretty: true
        }))
        .pipe(gulp.dest('build'))
        .on('end', browserSync.reload);
})

gulp.task('stylus', function () {
    return gulp.src('src/static/stylus/style.styl')
        .pipe(glp.sourcemaps.init())
        .pipe(glp.stylus())
        .pipe(glp.autoprefixer('last 10 versions'))
        .on("error", glp.notify.onError({
            message: "Error: <%= error.message %>",
            title: "Error running something"
        }))
        .pipe(glp.csso())
        .pipe(glp.sourcemaps.write())
        .pipe(gulp.dest('build/static/css/'))
        .pipe(browserSync.reload({
            stream: true
        }));
})

gulp.task('scripts', function () {
    return gulp.src('src/static/js/**/*')
        .pipe(gulp.dest('build/static/js'))
        .pipe(browserSync.reload({
            stream: true
        }));
})

gulp.task('fonts', function () {
    return gulp.src('src/static/fonts/**/*')
        .pipe(gulp.dest('build/static/fonts'))
})

gulp.task('image', function () {
    return gulp.src('src/static/img/**/*')
        .pipe(glp.image())
        .pipe(gulp.dest('build/static/img'));
})

gulp.task('watch', function () {
    gulp.watch('src/pug/**/*.pug', gulp.series('pug'));
    gulp.watch('src/static/stylus/**/*.styl', gulp.series('stylus'));
    gulp.watch('src/static/fonts/**/*', gulp.series('fonts'));
    gulp.watch('src/static/img/**/*', gulp.series('image'));
    gulp.watch('src/static/js/**/*', gulp.series('scripts'));
})

gulp.task('default', gulp.series(
    gulp.parallel('pug', 'stylus', 'scripts', 'fonts', 'image'),
    gulp.parallel('watch', 'browser-sync')
))