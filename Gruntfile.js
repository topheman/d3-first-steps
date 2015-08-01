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
    },

    clean: {
      build: {
        src : ['build/*','build/**/*',"!.git/**/*"]
      }
    },

    //this one isn't used because there are only images as assets and they are included in css as base64
    copy: {
      build: {
        files:[
          {
            expand: true,
            src: [
              '*.html',
              'views/**/*',
              'styles/**/*',
              'scripts/**/*',
              'data/**/*'
            ],
            dest: 'build/'
          }
        ]
      }
    }
    
  });
  
  grunt.registerTask('serve', ['connect:dev']);
  grunt.registerTask('build', ['clean:build','copy:build']);

}