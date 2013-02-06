var fs = require('fs');

module.exports = function ( grunt ) {
	var projectName = 'mytravis';

  grunt.initConfig({
    lint: {
      files: ['js/**/*.src.js', 'specs/**/*.spec.js']
    },

    concat: {
      js: {
        src: ['js/**/*.js'],
        dest: 'build/'+projectName+'.src.js'
      },

      css: {
        src: ['css/**/*.css'],
        dest: 'build/'+projectName+'.src.css'
      }
    },

    min: {
      dist: {
        src: [''+projectName+'.src.js'],
        dest: ''+projectName+'.min.js'
      },

      build: {
        src: ['build/'+projectName+'.src.js'],
        dest: 'build/'+projectName+'.min.js'
      },
    },

    // Not working
    cssmin: {
      dist: {
        src: [''+projectName+'.src.css'],
        dest: ''+projectName+'.min.css'
      },

      build: {
        src: ['build/'+projectName+'.src.css'],
        dest: 'build/'+projectName+'.min.css'
      }
    },
    
    imgs: {
			build: {
				src: 'imgs',
				dest: 'build'
			}
    },

    //watch: {
        //files: ['js/**/*.js', 'css/**/*.css'],
        //tasks: 'reload'
    //},

    zip: {
      dist: {
        exclude: ['./.git\*', './node_modules\*', './imgs/screenshots\*'],
        src: '.',
        dest: ''+projectName+'.zip'
      }
    }
  });

  // Aliased tasks (for readability purposes on "build" task)
  grunt.registerTask('o:cssmin', 'cssmin:build');
  grunt.registerTask('o:jsmin', 'min:build');
  grunt.registerTask('o:jslint', 'lint');
  grunt.registerTask('o:min', 'min:dist');
  grunt.registerTask('o:zip', 'zip:dist');
  grunt.registerTask('o:test', 'test');
  grunt.registerTask('o:imgs', 'imgs');
  grunt.registerTask('o:build', 'o:test o:jslint concat o:jsmin o:imgs');

  
  grunt.registerMultiTask('imgs', 'Copy images to the build folder', function () {
      var done = this.async();

      if (fs.existsSync(this.data.src)) {
          grunt.utils.spawn({ cmd: 'cp', args: ['-R', this.data.src, this.data.dest]}, function (err, result, code) {
              if ( result.stderr ) {
                  grunt.log.writeln( '\n'+result.stderr+'\n' );
              } else {
                  grunt.log.writeln('Image files copied successfully.');
              }
              
              done(code>0? false: true);
          } );
      } else {
          grunt.log.writeln('Nothing to do.');
      }
  } );


  grunt.registerMultiTask('zip', 'Creates package for deploy.', function () {
      var options, done = this.async();

      options = ['--exclude'].concat(this.data.exclude);
      options = options.concat(['-r', this.data.dest, this.data.src]);
      
      grunt.utils.spawn({cmd: 'zip', args: options}, function (err, result, code) {
          var output = result.stderr? result.stderr: result.stdout;
          grunt.log.writeln( '\n'+output+'\n' );
          
          done(code>0? false: true);
      });
  });


  grunt.registerTask('test', 'Run specs using npm test', function () {
      var done = this.async();

      grunt.utils.spawn({ cmd: 'npm', args: ['test'] }, function (err, result, code) {
          var output = result.stderr? result.stderr: result.stdout;
          grunt.log.writeln( '\n'+output+'\n' );
          
          done( code>0? false: true );
      });
  });
};
