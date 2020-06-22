const gulp = require('gulp');
const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');
const rev = require('gulp-rev');
const uglify = require('gulp-uglify-es').default;
const imagemin = require('gulp-imagemin');
const del = require('del');

gulp.task('css', function (done)
{
    console.log('Minifying CSS...');

    gulp.src('./assets/scss/**/*.scss')
        .pipe(sass())
        .pipe(cssnano())
        .pipe(gulp.dest('./assets/css'))
    gulp.src('./assets/**/*.css', {base:'assets'})/* https://lifesaver.codes/answer/merge-true-not-working-for-rev-manifest() */
        .pipe(rev())
        .pipe(gulp.dest('./public/assets'))
        .pipe(rev.manifest('manifest.json', {
            cwd: 'public',
            merge: true
        }))
        .pipe(gulp.dest('./public/assets'));
    done()
});


gulp.task('js', function (done)
{
    console.log('minifying js...');

    gulp.src('./assets/**/*.js')
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest('./public/assets'))
        .pipe(rev.manifest('manifest.json', {
            cwd: 'public',
            merge: true
        }))
        .pipe(gulp.dest('./public/assets'));

    done();
})

gulp.task('images', function (done)
{
    console.log('Compressing Images');

    gulp.src('./assets/**/*.+(png|jpg|gif|svg|jpeg)')
        .pipe(imagemin())
        .pipe(rev())
        .pipe(gulp.dest('./public/assets'))
        .pipe(rev.manifest('manifest.json', {
            cwd: 'public',
            merge: true
        }))
        .pipe(gulp.dest('./public/assets'));

    done();
});


//this task will clear the public/assets directory
gulp.task('clean:assets', function (done)
{
    del.sync('./public/**');
    done();
});

// main builder
gulp.task('build', gulp.series('clean:assets', 'css', 'js', 'images'), function (done)
{
    console.log('Building Assets');
    done();
})