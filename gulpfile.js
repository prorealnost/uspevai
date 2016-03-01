/* Load plugins */
var gulp = require('gulp'),
  sass = require('gulp-sass'),
  watch = require('gulp-watch'),
  notify = require('gulp-notify'),
  connect = require('gulp-connect'),
  cp = require('child_process');

gulp.task('connectBuild', function() {
  connect.server({
    root: '_site',
    port: 8000,
    livereload: true
  });
});

/**
 * Build the Jekyll Site
 */
gulp.task('jekyll', function(done) {
  notify('Compiling Jekyll');

  return cp.spawn('jekyll', ['build'], {stdio: 'inherit'})
  .on('close', done);
});

gulp.task('jekyll-rebuild', ['jekyll'], function() {    
  gulp.src('./index.html')
    .pipe( connect.reload() )
    .pipe( notify('Compiling Jekyll') );
});

gulp.task('css', function() {
  return gulp.src('./_sass/*.scss')
    .pipe( sass() )
    .pipe( gulp.dest('./_site') )
    .pipe( connect.reload() )
    .pipe( notify('CSS task complete!') )
});

/* Default task */
gulp.task('default', ['connectBuild', 'watch'], function() {
  gulp.start('jekyll');
});

/* Watch task */
gulp.task('watch', function() {
  gulp.watch('./_sass/*.scss', ['css']);
  gulp.watch(['*.html', '_layouts/*.html', '_posts/*', 'images/*'], ['jekyll-rebuild']);
});

// for i in {1..8}; do convert learn-icon-$i.png -gravity center -background none -extent 165x165 learn-icon-$i-extend.png; done
