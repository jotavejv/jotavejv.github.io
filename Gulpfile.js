'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

gulp.task('sass', function () {
    return gulp.src('./sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.stream());
});

gulp.task('js', function () {
    return gulp.src('./*.js')
        .pipe(gulp.dest('./'))
        .pipe(browserSync.stream());
});

gulp.task('server', ['sass'], function () {

    browserSync.init({
        server: "./"
    });

    gulp.watch('./sass/**/*.scss', ['sass']);
    gulp.watch('./*.js', ['js']);
    gulp.watch("./*.html").on('change', browserSync.reload);
});

gulp.task('build', ['sass'], function () {});

gulp.task('default',['server']);