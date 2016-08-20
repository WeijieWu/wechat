const gulp = require('gulp');
const babel = require('gulp-babel');
const nodemon = require('gulp-nodemon');
const mocha = require('gulp-mocha');
var paths = {
  scripts: ['src/**/*.js', 'src/**/*.json'],
  images: ''
};

gulp.task('default', ["config", "transrform"]);

gulp.task('config', () =>
  gulp.src(paths.scripts[1])
    .pipe(gulp.dest('bin'))
);

gulp.task('transrform', () =>
   gulp.src(paths.scripts[0])
    .pipe(babel({
      presets: ["es2015", "stage-1"],
      plugins: ['transform-runtime']
    }))
    .pipe(gulp.dest('bin'))
);

gulp.task('devstart', () =>
  nodemon({script: 'bin/app.js'})
);

gulp.task('watch', ['default', 'devstart'], () =>
  gulp.watch(paths.scripts, ['default'])
);

gulp.task('test', () =>
  gulp.src('src/api/**/test.js')
    .pipe(mocha())
    .once('error', () => {
      process.exit(1);
    })
    .once('end', () => {
      process.exit();
    })
);

