var gulp = require('gulp')
var browserify = require('./support/browserify')

gulp.task('watch', ['copy'], function () {
  gulp.watch('app/**/*.{css,html}', ['copy:assets'])

  return browserify(true)
})
