var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;


gulp.task('default', [], function () {
    console.log("Command:\n   serve - run live reload server");
});


// Optimize images
gulp.task('images', () =>
  gulp.src('images/**/*')
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('dist/images'))
    .pipe($.size({title: 'images'}))
);



gulp.task('serve', [], function () {
    browserSync({
        notify: false,
        server: {
            baseDir: '.'
        }
    });
    gulp.watch(['*.html'], reload);
    gulp.watch(['js/*.js'], reload);
    gulp.watch(['css/*.css'], reload);
});