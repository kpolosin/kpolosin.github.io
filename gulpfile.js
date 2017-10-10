var gulp = require('gulp');
cache = require('gulp-cache');
clean = require('gulp-clean');
size = require('gulp-size');
var cleanCSS = require('gulp-clean-css');
const jshint = require('gulp-jshint');
var minify = require('gulp-minify');
rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const autoprefixer = require('gulp-autoprefixer');


//
// autoprefixer
gulp.task('default', () =>
gulp.src('src/css/*.css')
    .pipe(autoprefixer({
        browsers: ['last 15 versions'],
        cascade: false
    }))
    .pipe(gulp.dest('dist/css/'))
);
//


gulp.task('minify-css', () => {
    return gulp.src('src/css/*.css')
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('dist/css/'));
});


// Проверка ошибок в скриптах
gulp.task('lint', function() {
    return gulp.src(['js/*.js', '!js/*.min.js', '!js/*jquery*', '!js/*bootstrap*'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('compress', function() {
    gulp.src('src/js/*.js')
        .pipe(minify({
            ext:{
                src:'-debug.js',
                min:'.min.js'
            },
            exclude: ['tasks'],
            ignoreFiles: ['.combo.js', '-min.js']
        }))
        .pipe(gulp.dest('dist/js/'))
});

// Сжатие изображений (кэшируем, чтобы сжимать только изменившиеся изображения)
// optimizationLevel - это количество проходов, диапазон параметра 0-7 и начиная с 1 включается компрессия
gulp.task('images', function () {
    return gulp.src(['src/images/*', 'src/!images/*.db'])
        .pipe(cache(imagemin({
            optimizationLevel: 5,
            progressive: true,
            interlaced: true
        })))
        .pipe(size({
            title: 'Images size -'
        }))
        .pipe(gulp.dest('dist/images/'));
});
gulp.task('minimg', function() {
    gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images/'))
});

// Чистим директорию назначения и делаем ребилд, чтобы удаленные из проекта файлы не остались
gulp.task('clean', function() {
    return gulp.src(['dist/css', 'dist/js', 'dist/images'], {read: false})
        .pipe(clean());
});

// Смотрим за изменением файловв реальном времени
gulp.task('watch', function() {
    gulp.watch('src/js/*.js', ['lint', 'scripts']);
    gulp.watch('src/css/*.css', ['styles']);
    gulp.watch('src/images/*', ['images']);
    gulp.watch('src/images/*', ['minimg']);

});

// Выполняем по-умолчанию (вначале очистка и ребилд директории назначения, а потом выполнение остальных задач)
gulp.task('default', ['clean'], function() {
    gulp.start('lint', 'minify-css', 'compress', 'images', 'minimg');
});
