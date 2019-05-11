const gulp = require('gulp');
const hb = require('gulp-hb');
const path = require('path');
const browserSync = require('browser-sync').create();

const srcBase = path.resolve(__dirname, 'src');
const distBase = path.resolve(__dirname, 'dist');

function runBrowserSync(cb) {
    browserSync.init({
        server: {
            baseDir: distBase,
        }
    });

    cb();
};

function reloadBrowserSync(cb) {
    gulp.watch(
        path.resolve(distBase, '*'),
        browserSync.reload
    );

    cb();
};

function buildMarkup(cb) {
    gulp.src(path.resolve(srcBase, '*.html'))
        .pipe(hb().partials(path.resolve(srcBase, 'partials/*.html')))
        .pipe(gulp.dest(distBase));
    
    cb();
};

function watchMarkup(cb) {
    gulp.watch(
        path.resolve(srcBase, '**/*.html'),
        buildMarkup
    );

    cb();
}

gulp.task('start', gulp.series(
    runBrowserSync,
    reloadBrowserSync,
    gulp.parallel(
        watchMarkup
    )
));

gulp.task('build', gulp.parallel(
    buildMarkup
));