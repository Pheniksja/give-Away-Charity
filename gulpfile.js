const gulp = require('gulp'); // wzielismy pojedynczy obiekt z new(Gulp)
const sass= require('gulp-sass')
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const notifier = require('node-notifier');
const c = require('ansi-colors');


gulp.task ('moje', function() {
   console.log("hello");
});

//pokaz blad
function showError(err){
    console.log( c.red(err.messageFormated) )

    notifier.notify({
        title: 'ERROR SAS!',
        message: err.messageFormatted
    });

}

//odswierzanie strony
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        },
        notify: false
    });
});


gulp.task('sass', function () {
    return gulp.src('./scss/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: "compressed" //compact. expand
        }).on('error', showError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            // cascade: false - ulozy kaskada a u naS JEST COMPRRSES
        }))
        .pipe(sourcemaps.write(".")) //kropka sprawia, ze zapisuje sie w nowym pliku zamiast dlugiego linku do map
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.stream());
});

gulp.task("watch", function(){
    gulp.watch('./scss/**/*.scss', ['sass']);
    gulp.watch("*.html").on('change', browserSync.reload);
})

gulp.task('default', function () {
    console.log ("------------------------")
    gulp.start( ['sass', 'watch', 'browser-sync'] ); //uruchamia w tabeli zadania, ktore wskaże
})