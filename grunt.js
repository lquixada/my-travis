var fs = require('fs');

module.exports = function ( grunt ) {
	var projectName = 'mytravis';

  grunt.initConfig({
    lint: {
      files: ['js/**/*.src.js', 'specs/**/*.spec.js']
    },

    min: {
      build: {
        src: ['build/'+projectName+'.src.js'],
        dest: 'build/'+projectName+'.min.js'
      },
    },

    // Not working
    cssmin: {
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

    zip: {
      dist: {
        exclude: ['./.*', './node_modules*', './screenshots*'],
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
  grunt.registerTask('o:build', 'o:test o:jslint o:jsmin o:imgs');

  
  grunt.registerMultiTask('imgs', 'Copy images to the build folder', function () {
    var done = this.async();

    if (fs.existsSync(this.data.src)) {
      grunt.utils.spawn({ cmd: 'cp', args: ['-R', this.data.src, this.data.dest]}, function (err, result, code) {
				grunt.helper('writeOutput', result.err, 'Image files copied successfully.', code);
        
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
		  grunt.helper('writeOutput', result.err, result.stdout, code);

			done(code>0? false: true);
    });
  });


  grunt.registerTask('test', 'Run specs using npm test', function () {
    var done = this.async();

    grunt.utils.spawn({ cmd: 'npm', args: ['test'] }, function (err, result, code) {
		  grunt.helper('writeOutput', result.err, result.stdout, code);
      
      done(code>0? false: true);
    });
  });


	// Helpers
	
	grunt.task.registerHelper("writeOutput", function (errorMsg, successMsg, code) {
    var output = errorMsg || successMsg;

    grunt.log.writeln( '\n'+output+'\n' );
  });
};
