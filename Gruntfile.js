module.exports = function (grunt) {
	
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
					helpers: 'spec/spec.src.js',
					vendor: [
						'vendor/o.min.js',
						'vendor/litemq.min.js',
						'vendor/jquery-1.9.1.min.js',
						'vendor/handlebars.js'
					]
				}
			}
		}
  });

	grunt.loadNpmTasks('grunt-o-bundle');
	grunt.loadNpmTasks('grunt-contrib-compress');
};
