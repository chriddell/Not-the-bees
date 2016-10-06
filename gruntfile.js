module.exports = function (grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      sass: {
        files: ['./css/sass/*.scss', './css/sass/*/*.scss'],
        tasks: ['sass:dev', 'autoprefixer:dev'],
      },
      js: {
        files: ['./js/*/*.js'],
        tasks: ['uglify'],
      }
    },

    sass: {
      dev: {
        options: {
          outputStyle: 'compressed',
          sourceMap: true
        },
        files: {
          './css/style.min.css': './css/sass/style.scss'
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

    uglify: {
      lib: {
        files: [{
          cwd: './',
          src: 'js/lib/*.js',
          dest: './js/lib/built/lib.min.js'
        }],
        options: {
          sourceMap: true
        }
      },
      app: {
        files: [{
          cwd: './',
          src: 'js/app/*.js',
          dest: './js/app/built/app.min.js'
        }],
        options: {
          sourceMap: true
        }
      }
    },

    autoprefixer: {
      dev: {
        options: {
          map: true, 
          browsers: ['ie >= 8', '> 0%']
        }, 
        src: './css/style.min.css',
        dest: './css/style.min.css'
      }
    },

    browserSync: {
      bsFiles: {
        src : [
          'css/style.min.css',
          'js/*/*/*.js'
        ]
      },
      options: {
        watchTask: true,
        proxy: 'advent.dev/abm'
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', [
    'browserSync', 'watch'
  ]);
  grunt.registerTask('dist', [
    'autoprefixer', 'sass:dist'
  ]);
};