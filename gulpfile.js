/* Load plugins */
var gulp = require('gulp'),
  sass = require('gulp-sass'),
  watch = require('gulp-watch'),
  notify = require('gulp-notify'),
  connect = require('gulp-connect');

gulp.task('connectBuild', function() {
  connect.server({
    root: '_site',
    port: 8000,
    livereload: true
  });
});

gulp.task('css', function() {
  return gulp.src('./_sass/*.scss')
    .pipe( sass() )
    .pipe( gulp.dest('./_site') )
    .pipe( connect.reload() )
    .pipe( notify('CSS task complete!') )
});

gulp.task('js', function() {
  return gulp.src('./js/*.js')
    .pipe( gulp.dest('./_site/js') )
    .pipe( connect.reload() )
    .pipe( notify('JS task complete!') )
});

gulp.task('html', function() {
  return gulp.src('./*.html')
    .pipe( connect.reload() )
    .pipe( gulp.dest('./_site') )
});

gulp.task('images', function() {
  return gulp.src(['./images/**/*'])
    .pipe( connect.reload() )
    .pipe( gulp.dest('./_site/images') )
});

gulp.task('vendor', function() {
  return gulp.src(['./vendor/**/*'])
    .pipe( connect.reload() )
    .pipe( gulp.dest('./_site/vendor') )
});

/* Default task */
gulp.task('default', ['connectBuild', 'watch'], function() {
  gulp.start('css', 'js', 'html', 'images', 'vendor');
});

/* Watch task */
gulp.task('watch', function() {
  gulp.watch('./_sass/*.scss', ['css']);
  gulp.watch('./js/*.js', ['js']);
  gulp.watch('./images/*', ['images']);
  gulp.watch('./*.html', ['html']);
});

// for i in {1..12}; do convert gives-icon-$i.png -gravity center -background none -extent 180x180 gives-icon-$i-extend.png; done
// for i in {1..3}; do convert whom-icon-$i.png -gravity center -background none -extent 192x192 whom-icon-$i-extend.png; done
// for i in {1..3}; do convert how-icon-1-$i.png -gravity center -background none -extent 160x160 how-icon-1-$i-extend.png; done
// for i in {1..2}; do convert how-icon-2-$i.png -gravity center -background none -extent 160x160 how-icon-2-$i-extend.png; done

// for i in {1..3}; do convert method-icon-$i.png -gravity center -background none -extent 222x222 method-icon-$i-extend.png; done
// for i in {1..6}; do convert find-icon-$i.png -gravity center -background none -extent 165x165 find-icon-$i-extend.png; done
