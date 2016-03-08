const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const reload = browserSync.reload;


//// Optimize images
//gulp.task('images', () =>
//  gulp.src('images/**/*')
//    .pipe($.cache($.imagemin({
//      progressive: true,
//      interlaced: true
//    })))
//    .pipe(gulp.dest('dist/images'))
//    .pipe($.size({title: 'images'}))
//);

gulp.task('babel', function(){
    gulp.src('js/*.js')
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