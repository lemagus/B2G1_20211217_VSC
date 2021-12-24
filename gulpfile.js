
const gulp = require('gulp');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');

const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');

const imagemin = require('gulp-imagemin');

const browserSyncServer = require('browser-sync').create();

function compressImages(done) {

    gulp.src([
        './src/img/**/*.jpg',
        './src/img/**/*.jpeg',
        './src/img/**/*.png',
        './src/img/**/*.gif',
        './src/img/**/*.svg'
    ])
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/img'));

    done();
}

function html(done){
    
    gulp.src('./*.html')
        .pipe( gulp.dest('./dist/') );
    
    done();
} 

function reloadBrowser(done){

    browserSyncServer.reload();

    done();
}

function browserSync(done) {

    browserSyncServer.init({
        server: {
            baseDir: "./dist"
        }
    });

    done();
}

function styles(done) {

    gulp.src('./src/scss/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle:'expanded'
        }))
        .pipe(postcss([
            autoprefixer()
        ]))
        .pipe(sourcemaps.write('./'))
        .pipe( gulp.dest('./dist/css') )
        .pipe(browserSyncServer.stream());

    done();
}

function javascript(done) {
    
    gulp.src('./src/js/*.js')
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(concat('main.min.js'))
        .pipe(sourcemaps.write('./'))
        .pipe( gulp.dest('./dist/js') )
        .pipe(browserSyncServer.stream());

    done();
}

function watchFiles(done) {

    gulp.watch('./src/js/**/*.js', javascript);
    gulp.watch('./src/scss/**/*.scss', styles);

    gulp.watch('./src/img/**/*', compressImages);

    gulp.watch('./*.html', gulp.series(html, reloadBrowser));

    done();
}

// gulp.series
// gulp.parallel

exports.default = gulp.parallel(browserSync,
                                compressImages, 
                                gulp.series(html, javascript, styles, watchFiles));

exports.compress = compressImages;