const path = require('path');
const gulp = require('gulp');
const hb = require('gulp-hb');
const copy = require('gulp-copy');
const browserSync = require('browser-sync').create();

const srcBase = path.resolve(__dirname, 'src');
const distBase = path.resolve(__dirname, 'dist');

const staticSrc = [
    path.resolve(srcBase, 'assets/*'),
    path.resolve(srcBase, 'script/*'),
    path.resolve(srcBase, 'style/*'),
];

function runBrowserSync(cb) {
    browserSync.init({
        server: {
            baseDir: path.resolve(distBase),
        },
    });

    cb();
};

function reloadBrowserSync(cb) {
    gulp.watch(
        path.resolve(distBase),
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

function copyStatic(cb) {
    gulp.src(staticSrc)
        .pipe(copy(path.resolve(distBase), { prefix: 1 }))
        // .pipe(gulp.dest(path.resolve(distBase)));

    cb();
}

function watchStatic(cb) {
    gulp.watch(
        staticSrc,
        copyStatic
    );

    cb();
}

gulp.task('start', gulp.series(
    runBrowserSync,
    reloadBrowserSync,
    gulp.parallel(
        buildMarkup,
        copyStatic,
    ),
    gulp.parallel(
        watchMarkup,
        watchStatic
    )
));

gulp.task('build', gulp.parallel(
    buildMarkup,
    copyStatic
));