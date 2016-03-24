'use strict';

var Stamplay = require('stamplay-cli');
var Transform = require('readable-stream/transform');
var gutil = require('gulp-util');
var _ = require('lodash');
var originalExit = process.exit;


function _validateOptions(options) {
  var err;
  if (!options.appId) {
    err = new gutil.PluginError('gulp-stamplay', 'Parameter appId is missing');
    throw err;
  } else if (!options.apiKey) {
    err = new gutil.PluginError('gulp-stamplay', 'Parameter apiKey is missing');
    throw err;
  }
}


function _deployCommand(options) {
  var err;
  var args = {
    _: ['deploy']
  };

  options.ignore = (options.ignore) ? options.ignore : [];
  options.headers = (options.headers) ? options.headers : [];
  
  if (!(options.ignore instanceof Array)) {
    err = new gutil.PluginError('gulp-stamplay', 'Parameter ignore must be an array');
    throw err;
  } else if (!(options.headers instanceof Array)) {
    err = new gutil.PluginError('gulp-stamplay', 'Parameter headers must be an array');
    throw err;
  }

  if (options.message) {
    args.m = options.message;
  }

  Stamplay.setConfiguration(options);
  Stamplay.deploy(args);
}

module.exports = function stampaly(options) {
  return {
    deploy: function deploy(deployOptions) {
      _validateOptions.call(this, options)
      var message = 'Processing deploy to Stamplay\'s cdn for app \'' + gutil.colors.cyan(options.appId) + '\''
      gutil.log(message);
      _.merge(options, deployOptions)
      var deployed = false
      return new Transform({
        objectMode: true,
        transform: function stamplayDeploy(file, enc, cb){
          var _this = this
          if (!deployed) {
            process.exit = function(){
              deployed = true
              _this.push(file)
              this.exit = originalExit;
              cb()
            }
            _deployCommand(options)
          } else {
            this.push(file) 
            cb()
          }
        }
      })
    }
  }
}
