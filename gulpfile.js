const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const react = require('gulp-react');
const reload = browserSync.reload;


var onError = function(err) {
  notify.onError({
    title:    "Error",
    message:  "<%= error %>",
  })(err);
  this.emit('end');
};

var plumberOptions = {
  errorHandler: onError,
};

gulp.task('react', function(){
    return gulp.src('js/*.jsx')
		.pipe(react())
		.pipe(gulp.dest('build'));
});

gulp.task('babel', function(){
    gulp.src('js/*.{js,jsx}')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('./build'))
        .pipe(browserSync.stream());
});

gulp.task('sass', function () {
  return gulp.src('./sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream());
});

gulp.task('serve', [], function () {
    browserSync({
        notify: false,
        server: {
            baseDir: '.'
        }
    });
    gulp.watch(['*.html'], reload);
    gulp.watch(['js/*.js'], ['babel']);
    gulp.watch(['css/*.css'], reload);
    gulp.watch(['sass/*.scss'], ['sass']);
});


gulp.task('default', ['serve', 'sass', 'babel'], function () {
    console.log("Command:\n   serve - run live reload server");
});