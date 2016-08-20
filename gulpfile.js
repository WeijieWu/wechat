const gulp = require('gulp');
const babel = require('gulp-babel');
const mocha = require('gulp-mocha');
var paths = {
  scripts: ['src/**/*.js', 'src/**/*.json'],
  images: ''
};

gulp.task('default', ["watch", "test"]);

gulp.task('config', () =>
  gulp.src(paths.scripts[1])
    .pipe(gulp.dest('bin'))
);

gulp.task('watch', () => {
  gulp.watch(paths.scripts, ["test"]);
});

gulp.task('transrform', () =>
   gulp.src(paths.scripts[0])
    .pipe(babel({
      presets: ["es2015", "stage-1"],
      plugins: ['transform-runtime']
    }))
    .pipe(gulp.dest('bin'))
);

gulp.task('test', ["config", "transrform"], () =>
  gulp.src('bin/api/**/test.js')
    .pipe(mocha())
    .once('error', () => {
    })
    .once('end', () => {
    })
);
