(function (gulp, gulpLoadPlugins) {

    const $ = gulpLoadPlugins({ pattern: '*', lazy: true }),
        _ = { src: 'src', dist: 'lib' };

    gulp.task('scripts', function() {
        return gulp.src(_.src + '/*.js')
            .pipe($.babel({
                presets: ['es2015']
            }))
            .pipe($.uglify())
            .pipe(gulp.dest(_.dist));
    });

    //|~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //| ✓ watch
    //|~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    gulp.task('watch', ['scripts'], function() {
        $.watch([
            _.src + '/*.js',
        ], function() {
            gulp.start('scripts');
        });
    });

    //|~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //| ✓ alias
    //|~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    gulp.task('build', ['scripts']);

    //|~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //| ✓ default
    //|~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    gulp.task('default', function () {
        gulp.start('build');
    });

})(require('gulp'), require('gulp-load-plugins'));
