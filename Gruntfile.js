// Gruntfile.js

// our wrapper function (required by grunt and its plugins)
// all configuration goes inside this function
module.exports = function(grunt) {

  // ===========================================================================
  // CONFIGURE GRUNT ===========================================================
  // ===========================================================================
  grunt.initConfig({

    // get the configuration info from package.json ----------------------------
    // this way we can use things like name and version (pkg.name)
    pkg: grunt.file.readJSON('package.json'),

    // all of our configuration will go here
    
    // remove duplicate or unneccessary files from dist
    // remove all files from dist
    clean: {
      build: {
        src: [ 'dist/**/*',  '!**/img/**']
      },
        
      buildfull: {
        src: [ 'dist/**/*' ]
      },        
        
    // remove unneccessary css files from dist
    stylesheets: {
        src: [ 'dist/style.css'],
        src: [ 'dist/experimentStyle.css']
    },
        
    // remove unneccessary controllers from dist
    scripts: {
        src: [ 'dist/controllers/*.js', '!dist/controllers/*.min.js', 'dist/directives/*.js', '!dist/directives/*.min.js', 'dist/services/*.js', '!dist/services/*.min.js'  ]
    },       
    },
           
      
    // copy all files from source to dist folder      
    copy: {
          build: {
            cwd: 'src',
            src: [ '**/*',  '!**/img/**' ],
            dest: 'dist',
            expand: true
          },
          buildfull: {
            cwd: 'src',
            src: [ '**' ],
            dest: 'dist',
            expand: true
          },
        },
      
  
      
    // configure uglify to minify js files -------------------------------------
    uglify: {
      build: {
        options: {
          mangle: false
        },
        files: {
          // collapse and minify controllers
          'dist/controllers/controllers.min.js': [ 'dist/controllers/searchController.js', 'dist/controllers/plannerRegController.js', 'dist/controllers/resourcesController.js'],
          // collapse and minify services
          'dist/services/services.min.js': [ 'dist/services/services.js', 'dist/services/data.js'],
          // minify directives
          'dist/directives/directive.min.js': [ 'dist/directives/directive.js'],
        }
      }
    },
      
    // configure cssmin to minify css files -------------------------------------      
    cssmin: {
      build: {
        files: {
          'dist/style.min.css': [ 'dist/style.css' ],
          'dist/experimentStyle.min.css': [ 'dist/experimentStyle.css' ],
        }
      }
    },
      
    // Replace html references to update for new files
    processhtml: {
        build: {
            files: {
                'dist/index.html' : ['src/index.html']
            }
        }
    },    
      
    // optimise all images 
      imagemin: {
        png: {
          options: {
            optimizationLevel: 7
          },
          files: [
            {
              // Set to true to enable the following options…
              expand: true,
              // cwd is 'current working directory'
              cwd: 'src/img/',
              src: ['**/*.png'],
              // Could also match cwd line above. i.e. project-directory/img/
              dest: 'dist/img/',
              ext: '.png'
            }
          ]
        },
        jpg: {
          options: {
            progressive: true
          },
          files: [
            {
              // Set to true to enable the following options…
              expand: true,
              // cwd is 'current working directory'
              cwd: 'src/img/',
              src: ['**/*.jpg'],
              // Could also match cwd. i.e. project-directory/img/
              dest: 'dist/img/',
              ext: '.jpg'
            }
          ]
        }
      },
      
// Replace object
    replace: {
      build_replace: {
        options: {
          variables: {
            // Generate a truly random number by concatenating the current date with a random number
            // The variable name corresponds with the same in our HTML file
            'hash': '<%= ((new Date()).valueOf().toString()) + (Math.floor((Math.random()*1000000)+1).toString()) %>'
          }
        },
        // Source and destination files
        files: [
          {
            src: ['dist/index.html'],
            dest: 'dist/index.html'
          }
        ]
      }
    },
      
  });
    
    // ============= // CREATE TASKS ========== //
    grunt.registerTask(
  'stylesheets', 
  'Compiles the stylesheets.', 
  [ 'cssmin', 'clean:stylesheets' ]
);
 
grunt.registerTask(
  'scripts', 
  'Compiles the JavaScript files.', 
  [ 'uglify', 'clean:scripts' ]
);
 
grunt.registerTask(
  'build', 
  'Compiles all of the assets and copies the files to the build directory.', 
  [ 'clean:build', 'copy', 'stylesheets', 'scripts', 'processhtml' ]
);
    
grunt.registerTask(
  'dist', 
  'Update assets in dist folder to be inline with source.', 
  ['clean:build', 'copy:build', 'uglify', 'clean:scripts','cssmin', 'clean:stylesheets', 'processhtml','replace' ]
);
    
grunt.registerTask(
  'distfull', 
  'Update assets in dist folder to be inline with source.', 
  ['clean:buildfull', 'copy:buildfull', 'uglify', 'clean:scripts','cssmin', 'clean:stylesheets', 'processhtml', 'imagemin','replace' ]
);    

  // ===========================================================================
  // LOAD GRUNT PLUGINS ========================================================
  // ===========================================================================
  // we can only load these if they are in our package.json
  // make sure you have run npm install so our app can find these
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');  
  grunt.loadNpmTasks('grunt-processhtml');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');    
  grunt.loadNpmTasks('grunt-newer');  
  grunt.loadNpmTasks('grunt-replace');
};