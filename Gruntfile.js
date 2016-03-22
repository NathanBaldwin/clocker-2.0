module.exports = function(grunt) {

  grunt.initConfig({
    sass: {
      dist: {
        files: {
          './public/styles/main.css': './public/sass/main.scss'
        }
      }
    },
    watch: {
      sassy: {
        files: ['../sass/**/*.scss'],
        tasks: ['sass']
      }
    }
  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.registerTask('default', ['sass', 'watch']);
};
