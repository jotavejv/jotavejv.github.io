'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var webpack = require('webpack-stream');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var fs = require('fs');
var fileinclude = require('gulp-file-include');
var rename = require("gulp-rename");
var browserSync = require('browser-sync').create();

var autoprefixerOptions = {
    browsers: ['last 4 versions', 'safari >= 5', 'ie 11', 'opera >= 12.1', 'ios >= 6', 'android >= 4']
};

var fileincludeOptions = {
    prefix: '@',
    basepath: './static',
    context: {}
}

gulp.task('sass', function () {
    return gulp.src('./sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(gulp.dest('./'))
    .pipe(browserSync.stream({ match: './*.css' }));
});

gulp.task('js', function () {
    return gulp.src('./js/app.js')
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest('./'))
        .pipe(browserSync.stream());
});

var htmlRootFiles = fs.readdirSync("./").filter(html => html.includes('template.html'));

function handlePublic(){
    htmlRootFiles.map( (file) => {
        return gulp.src('./' + file)
        .pipe(fileinclude(fileincludeOptions))
        .pipe(rename("index.html"))
        .pipe(gulp.dest('./'))
    })
}

gulp.task('server', ['sass'], function () {
    browserSync.init({
        server: "./"
    });
    gulp.watch('./sass/**/*.scss', ['sass']);
    gulp.watch('./js/*.js', ['js']);
    gulp.watch('./**/*.html', function(){
        handlePublic();
        setTimeout(e => browserSync.reload(), 1000);
    });
});

gulp.task('build', ['sass', 'js'], function () {
    handlePublic();
});

gulp.task('default',['server']);
