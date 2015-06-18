/* Reference: http://adrianmejia.com/blog/2014/10/07/grunt-js-tutorial-from-beginner-to-ninja/ */
/* Reference installing grunt packages: https://developer.tizen.org/dev-guide/2.2.0/org.tizen.web.appprogramming/html/guide/w3c_guide/perf_guide/install_use_grunt.htm */
var grunt = require('grunt');

grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-csslint');
grunt.loadNpmTasks('grunt-contrib-cssmin');
grunt.loadNpmTasks('grunt-contrib-clean');




module.exports = function(grunt){


	grunt.initConfig({
		jshint:{
			  all: [
				'scripts/main.js',
				'tasks/**/*'
			  ]
		},
		csslint:{
			  all: [
				'styles/**/*.css'
			  ]
		},
		cssmin:{
		  target: {
			files: [{
			  expand: true,
			  cwd: 'styles', /* working direetory */
			  src: ['*.css', '!*.min.css'],
			  dest: 'styles/minified', /* write individual min files here */
			  ext: '.css'
			}]
		  }
		},
		
	   uglify:{
			compress: {
				files: {
				  'scripts/minified/main.js': [
				  'scripts/main.js'
				  ]
				}
			}
		},
		clean:{
			css:['styles/minified'],
			js:['scripts/minified']
		}		
	})
};

grunt.registerTask('de', function(){console.log('Reached de');});

grunt.registerTask('default', [
	'jshint',
	'csslint',
	'cssmin',
	'uglify'
]);
grunt.registerTask('lintjs', [
	'jshint'
]);
grunt.registerTask('lintcss', [
	'csslint'
]);
grunt.registerTask('lintcssmin', [
	'cssmin'
]);
grunt.registerTask('lintuglify', [
	'uglify'
]);
grunt.registerTask('lintmin', [
	'uglify',
	'cssmin'
]);
grunt.registerTask('lintclean', ['clean']);


