
var gulp = require('gulp');
var options = {
  appId: 'gulp-app',
  apiKey: '1e1a6a6b98acde8bed8969aac1c1f00285cf24e0b01b9cc6ceaa3197a41d4f9a',
  public: './'
};

var stamplay = require('gulp-stamplay')(options);

gulp.task('deploy', function() {
  return gulp.src('src/*')
    .pipe(stamplay.deploy({
      message: 'App deployed!',
      ignore: [
        'src/index_dev.html'
      ]
    })
  );
});
