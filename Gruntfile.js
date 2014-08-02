'use strict';

module.exports = function(grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);
  
  grunt.initConfig({

    connect: {
      dev:{
        options: {
          open:true,
          port: 9000,
          hostname: "localhost",
          keepalive: true,
          base: ""
        }
      }
    }
    
  });
  
  grunt.registerTask('serve', ['connect:dev']);

}