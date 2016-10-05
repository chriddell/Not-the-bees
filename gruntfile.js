module.exports = function (grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      sass: {
        files: ['./css/sass/*.scss', './css/sass/*/*.scss'],
        tasks: ['sass:dev', 'autoprefixer:dev'],
        options: {
          livereload: true
        }
      },
      js: {
        files: ['./js/*'],
        tasks: [''],
        options: {
          livereload: true
        }
      }
    },

    sass: {
      dev: {
        options: {
          outputStyle: 'nested',
          sourceMap: true
        },
        files: {
          './css/style.css': './css/sass/style.scss'
        }
      },
      dist: {
        options: {
          outputStyle: 'compressed',
          sourceMap: false
        },
        files: {
          './css/style.min.css': './css/sass/style.scss'
        }
      }
    },

    autoprefixer: {
      dev: {
        options: {
          map: true, 
          browsers: ['ie >= 8', '> 0%']
        }, 
        src: './css/style.css',
        dest: './css/style.css'
      }
    },

    browserSync: {
      main: {
        bsFiles: {
          src : [
            'css/style.css',
            'js/**/*'
          ]
        },
        options: {
          watchTask: true,
          proxy: 'advent.dev/abm'
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-browser-sync');

  grunt.registerTask('default', [
    'watch'
  ]);
  grunt.registerTask('dist', [
    'autoprefixer', 'sass:dist'
  ]);
  grunt.registerTask('sync', [
    'browserSync', 'watch'
  ]);
};