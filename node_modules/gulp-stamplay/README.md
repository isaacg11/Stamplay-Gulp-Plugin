# gulp-stamplay

> Deploy your project with a gulp plugin

## Getting Started
If you haven't used [Gulp](http://gulpjs.com/) before, be sure to check out the [Getting Started](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md) guide, as it explains how to create a [Gulpfile](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md#3-create-a-gulpfilejs-at-the-root-of-your-project) as well as install and use Gulp plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install gulp-stamplay --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gulpfile with this line of JavaScript:

```js
var options = {
  appId: 'YOUR-APPID',
  apiKey: 'YOUR-APIKEY',
  public: './src'
}

var stamplay = require('gulp-stamplay')(options);
```

## Usage

```js
gulp.task('task-name', function () {
  return gulp.src('src/*')
    .pipe(stamplay.deploy({
      message: 'deploy message',
      ignore: [
        'src/index_dev.html'
      ]
    })
  )
});
```

### Options

#### options.appId
Type: `String`

The appId of the project on Stamplay

#### options.apiKey
Type: `String`

The apiKey of the project on Stamplay

#### options.public
Type: `String`

The public property tells the task which directory to upload to Stamplay. This directory must be inside the project directory and must exist. The default value is the root directory or your project.

## API

#### deploy(deployOptions)
In this example, headers property is used to specify to the Stamplay platform that all files with `.html` extension can be cached from the client. You can find more informations about options [here](https://stamplay.com/docs/hosting/command-line)

#### deployOptions.message
Type: `String`

The message to describe the deploy

#### deployOptions.ignore
Type: `Array`

Files that will not be uploaded during the deploy

#### deployOptions.headers
Type: `Array`

Specifies headers for client caching

```js
gulp.task('task-name', function () {
  return gulp.src('src/*')
    .pipe(stamplay.deploy({
      message: 'deploy message',
      ignore: [
        'src/index_dev.html'
      ],
      headers: [{
        source: '**/*.@(html)',
        headers: [{
          key: 'Cache-Control',
          value: 'max-age=7200'
        }]
      }]
    })
  )
});
```

## Release History
#### v1.0.0 - (22-03-2016)
    - Stamplay deploy task

