module.exports = function (grunt) {

      // configure the tasks
    grunt.initConfig({

        copy: {
            build: {
                cwd: 'src',
                src: [ 'index.html',
                'app/**',
            ],
            dest: 'build',
            expand: true
        },
    },

    clean: {
        build: {
            src: [ 'build' ]
        },
        stylesheets: {
            src: [ 'build/**/*.*.css', '!build/application.css' ]
        },
        scripts: {
            src: [ 'build/**/*.*.js', '!build/application.js' ],
        },
    },

    uglify: {
        build: {
            options: {
                mangle: false,
                preserveComments: false
            },
            files: {
                'build/application.js': [ 'build/**/*.*.js'  ],
            }
        }
    },

    cssmin: {
        build: {
            files: {
                'build/application.css': [ 'build/**/*.*.css' ]
            }
        }
    },
    
    watch: {
        stylesheets: {
            files: 'src/**/*.*.css',
            tasks: [ 'stylesheets' ]
        },
        scripts: {
            files: [ 'src/**/*.*.js' ],
            tasks: [ 'scripts' ]
        },
        copy: {
            files: [ 'src/**' ],
            tasks: [ 'copy' ]
        }
    },
    
    connect: {
        server: {
            options: {
                port: 8000,
                base: 'build',
                hostname: '*'
            }
        }
    }

});

  // load the tasks
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
    
  grunt.registerTask(
    'build', 
    'Compiles all of the assets and copies the files to the build directory.', 
    [ 'clean:build', 'copy', 'stylesheets', 'scripts' ]
  );
  
  grunt.registerTask(
    'scripts', 
    'Compiles the JavaScript files.', 
    [ 'uglify' ]
  );
  
  grunt.registerTask(
    'stylesheets', 
    'Compiles the stylesheets.', 
    [ 'clean:stylesheets', 'copy', 'cssmin' ]
  );
  
  grunt.registerTask(
    'default', 
    'Watches the project for changes, automatically builds them and runs a server.', 
    [ 'build', 'connect', 'watch' ]
  );
  
  // define the tasks
};