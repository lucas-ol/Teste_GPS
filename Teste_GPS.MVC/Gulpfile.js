const gulp = require('gulp');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const bs = require('browser-sync').create();
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const pumbler = require('gulp-plumber');

const paths = {  };
paths.js = {
    dest: 'js',
    src: 'Assets/js/**/*.js'
};
paths.css = {
    dest: 'css',
    src: 'assets/scss/**/*.scss'
};

paths.generalSources = [
    '!node_modules',
    '/Views/**/*.cshtml',
    'js/**/*.js'
];

const processors = [
    autoprefixer({
        bss: ['last 3 versions', 'ie > 9']
    })
];


gulp.task('build:js', () => {
    return gulp.src(paths.js.src)
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(uglify())
        .pipe(pumbler())
        .pipe(bs.stream())
        .pipe(gulp.dest(paths.js.dest));
});

gulp.task('compile:js', () => {
    return gulp.src(paths.js.src)
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(pumbler())
        .pipe(bs.stream())
        .pipe(gulp.dest(paths.js.dest));
});

/* css da aplicação */
gulp.task('build:css', () => {
    return gulp.src(paths.css.src)
        .pipe(sass({ outputStyle: 'compressed', }))
        .pipe(pumbler())
        .pipe(postcss(processors))
        .pipe(bs.stream())
        .pipe(gulp.dest(paths.css.dest));
});

gulp.task('compile:css', () => {

    return gulp.src(paths.css.src)
        .pipe(sass({ outputStyle: 'compact', }))
        .pipe(pumbler())
        .pipe(postcss(processors))
        .pipe(bs.stream())
        .pipe(gulp.dest(paths.css.dest));
});


gulp.task('watch', () => {
    bs.init({
        proxy: "https://localhost:44336"
    });

    gulp.watch(paths.css.src, gulp.series('compile:css'));
    gulp.watch(paths.js.src, gulp.series('compile:js'));
    gulp.watch(paths.generalSources).on('change', bs.reload);

});
gulp.task('default', gulp.series('watch'));
gulp.task('build', gulp.series('build:css', 'build:js'));