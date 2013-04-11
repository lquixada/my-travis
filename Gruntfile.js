module.exports = function (grunt) {
	var 
		files = [],
		js = ['*.src.js', 'app/**/*.src.js'],
		css = ['*.src.css', 'style/**/*.src.css'],
		spec = ['*.spec.js', 'spec/**/*.spec.js'];
	
  grunt.initConfig({
		projectName: 'mytravis',

		compress: {
			main: {
				options: {
					archive: '<%=projectName%>.zip'
				},
				files: [{
					src: ['**', '!*.zip', '!node_modules/**', '!screenshots/**'],
					dest: '.'
				}]
			}
		},

		url: {
			pivotal: {
				host: 'localhost',
				port: '<%=connect.pivotal.options.port%>',
				runner: '<%=jasmine.pivotal.options.outfile%>'
			}
		},

	  jasmine: {
			pivotal: {
				src: [
				  'app/app.src.js',
					'app/helper/*.src.js',
					'app/model/*.src.js',
					'app/controller/*.src.js',
					'app/service/*.src.js'
				],
				options: {
					host: 'http://localhost:<%=connect.pivotal.options.port%>/',
					vendor: [
						'vendor/o.min.js',
						'vendor/litemq.min.js',
						'vendor/jquery-1.9.1.min.js',
						'vendor/handlebars.js',
						'spec/spec.src.js'
					],
					specs: files.concat(spec),
					outfile: 'runner.html'
				}
			}
		}
  });

	grunt.loadNpmTasks('grunt-o-bundle');
	grunt.loadNpmTasks('grunt-contrib-compress');

	grunt.registerMultiTask('url', 'Mounts url on screen', function () {
		var host = this.data.host;
		var port = this.data.port;
		var runner = this.data.runner; 

		grunt.log.writeln('Specs can now be accessed on http://'+host+':'+port+'/'+runner);
	});
};
