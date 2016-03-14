
//include thư viện cần thiết.

const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync');
const browserify = require('browserify');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const react = require('gulp-react');
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');
const filter = require('gulp-filter');
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

// Compile Sass to CSS
gulp.task('sass', function() {
  var autoprefixerOptions = {
    browsers: ['last 2 versions'],
  };

  var filterOptions = '**/*.css';

  var reloadOptions = {
    stream: true,
  };

  var sassOptions = {
    includePaths: [

    ]
  };

  return gulp.src('assets/sass/*.scss')
    .pipe(plumber(plumberOptions))
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(gulp.dest('assets/css'))
    .pipe(filter(filterOptions))
    .pipe(reload(reloadOptions));
});

//compile react, es6 -> javascript
gulp.task('babel', function(){
    return gulp.src('assets/js/*.js')
        .pipe(plumber(plumberOptions))
        .pipe(react())
        .pipe(babel({
            presets: ['react','es2015']
        }))
        .pipe(gulp.dest('assets/build'))
        .pipe(browserSync.stream()); 
});

// Watch JS/JSX and Sass files
gulp.task('watch', function() {
  	gulp.watch(['*.{html,php}'], reload);
  	gulp.watch(['assets/js/*.js'], ['babel']);
  	gulp.watch(['assets/css/*.css'], reload);
  	gulp.watch(['assets/sass/*.scss'], ['sass']);
});

gulp.task('serve', [], function () {
    browserSync({
        notify: false,
        server: {
            baseDir: '.'
        }
    });
});

gulp.task('default', ['serve', 'sass', 'babel', 'watch'], function () {
    console.log("Command:\n   serve - run live reload server");
});