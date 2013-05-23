module.exports = function (grunt) {
	
  grunt.initConfig({
		compress: {
			main: {
				options: {
					archive: 'build/<%=pkg.name%>.zip'
				},
				files: [{
					src: ['**', '!build/**', '!node_modules/**', '!screenshots/**', '!spec/**'],
					dest: '.'
				}]
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
					styles: '',
					helpers: 'spec/spec.src.js',
					vendor: [
						'vendor/o.min.js',
						'vendor/litemq.min.js',
						'vendor/jquery-2.0.0.min.js',
						'vendor/handlebars.min.js'
					]
				}
			}
		}
  });

	grunt.loadNpmTasks('grunt-o-bundle');
	grunt.loadNpmTasks('grunt-contrib-compress');

	grunt.registerTask('o:build', ['compress']);
};
