module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.initConfig({
    sass: {
      dist: {
        files: {'webpack/curls.css' : 'sass/curls.scss'}
      }
    },
    watch: {
      sass: {
        files: ['sass/**/**.scss'],
        tasks: ['sass']
      }
    } //watch
    }); //initConfig
    grunt.registerTask('default', function() {grunt.task.run(['sass', 'watch']);
  });
}; //exports
