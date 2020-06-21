const gulp=require('gulp');
const sass=require('gulp-sass');
const cssnano=require('gulp-cssnano');
const rev=require('gulp-rev');

gulp.task('css',  function(done)
{
    console.log('Minifying CSS...');

     gulp.src('./assets/scss/**/*.scss')
    .pipe(sass())
    .pipe(cssnano())
    .pipe(gulp.dest('./assets/css'))

    .pipe(gulp.src('./assets/**/*.css'))
     
    .pipe(rev())
    .pipe(gulp.dest('./public/assets/css'))
    .pipe(rev.manifest({
        cwd:'public',
        merge:true
    }))
    .pipe(gulp.dest('./public/assets/css'));
    done()
})