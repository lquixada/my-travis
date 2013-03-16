var fs = require('fs');

module.exports = function ( grunt ) {
	var projectName = 'mytravis';

  grunt.initConfig({
    jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
      files: ['js/**/*.src.js', 'specs/**/*.spec.js']
    },

    uglify: {
      build: {
        src: ['js/**/*.src.js'],
        dest: 'build/'+projectName+'.min.js'
      }
    },

    cssmin: {
      build: {
        src: ['css/**/*.src.css'],
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

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');

  // Aliased tasks (for readability purposes on "build" task)
  grunt.registerTask('o:cssmin', 'cssmin:build');
  grunt.registerTask('o:jsmin', 'uglify:build');
  grunt.registerTask('o:jslint', 'jshint');
  grunt.registerTask('o:zip', 'zip:dist');
  grunt.registerTask('o:test', 'test');
  grunt.registerTask('o:imgs', 'imgs');
  grunt.registerTask('o:build', ['o:test', 'o:jslint', 'o:jsmin', 'o:cssmin', 'o:imgs']);

  
  grunt.registerMultiTask('imgs', 'Copy images to the build folder', function () {
    var done = this.async();

    if (fs.existsSync(this.data.src)) {
      grunt.util.spawn({ cmd: 'cp', args: ['-R', this.data.src, this.data.dest]}, function (err, result, code) {
				writeOutput(result.err, 'Image files copied successfully.', code);
        
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
    
    grunt.util.spawn({cmd: 'zip', args: options}, function (err, result, code) {
		  writeOutput(result.err, result.stdout, code);

			done(code>0? false: true);
    });
  });


  grunt.registerTask('test', 'Run specs using npm test', function () {
    var done = this.async();

    grunt.util.spawn({ cmd: 'npm', args: ['test'] }, function (err, result, code) {
		  writeOutput(result.err, result.stdout, code);
      
      done(code>0? false: true);
    });
  });


	// Helpers
	function writeOutput(errorMsg, successMsg, code) {
    var output = errorMsg || successMsg;

    grunt.log.writeln( '\n'+output+'\n' );
	}
};
