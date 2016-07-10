module.exports = function (grunt) {
    grunt.initConfig({
        sass: {
            dist: {
                options: {
                    style: 'compressed',
                    sourcemap: 'none'
                },
                files: {
                    'www/style/app.compiled.css': 'src/scss/app.scss'
                }
            }
        },
        browserify: {
            dist: {
                options: {
                    transform: ['babelify', 'browserify-ngannotate']
                },
                files: {
                    "www/js/app.es5.js": [
                        "src/js/app.js"
                    ]
                }
            }
        },
        html2js: {
            main: {
                options: {
                    module: 'e30.switches.views'
                },
                src: [ 'src/**/*.html' ],
                dest: 'www/js/templates.js'
            }
        },
        concat: {
            javascript: {
                src: [
                    /* BOWER JS modules*/
                    'bower_components/angular/angular.js',
                    'bower_components/angular-animate/angular-animate.js',
                    'bower_components/angular-material/angular-material.js',
                    'bower_components/angular-aria/angular-aria.js',
                    'bower_components/angular-messages/angular-messages.js',
                    'bower_components/angular-ui-router/release/angular-ui-router.js',
                    
                    'www/js/app.es5.js',
                    'www/js/templates.js'
                ],
                dest: 'www/js/app.js'
            },
            css: {
                src: [
                    'bower_components/angular-material/angular-material.min.css',
                    'www/style/app.compiled.css'
                ],
                dest: 'www/style/app.css'
            }
        },
        uglify: {
            app: {
                files: {
                    'www/js/app.js': ['www/js/app.js']
                }
            }
        },
        watch: {
            options: {
                event: ['changed', 'added', 'deleted'],
                livereload: {
                    host: 'localhost'
                }
            },
            scripts: {
                files: ["src/js/**/*.js"],
                tasks: ["browserify", "concat:javascript"]
            },
            styles: {
                files: ["src/scss/**/*.scss"],
                tasks: ["sass", "concat:css"]
            },
            config: {
                files: ['src/config.json'],
                tasks: ['copy:config']
            },
            templates: {
                files: 'src/**/*.html',
                tasks: ['html2js', 'concat:javascript']
            },
            assets: {
                files: [
                    "src/assets/**/*",
                    "src/views/**/*"
                ],
                tasks: ["copy"]
            }
        },
        copy: {
            assets: {
                files: [
                    {
                        cwd: 'src/assets/', src: '**/*', dest: 'www/assets/', expand: true
                    }, {
                        cwd: 'src/views/', src: '**/*', dest: 'www/', expand: true
                    }
                ]
            }
        },
        clean: {
            all: [
                'www/*'
            ],
            dev: [
                'www/js/app.es5.js',
                'www/dialog',
                'www/main.html',
                'www/sections.html',
                'www/switches.html',
                'www/style/app.compiled.css',
                'www/js/templates.js'
                
            ]
        },
        'http-server': {
            dev: {
                root: 'www/',
                // host: '192.168.1.105',
                port: 8282,
                showDir: true,
                autoIndex: true,
                ext: "html",
                runInBackground: true
            }
        }
    });
    

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-http-server');

    grunt.registerTask("build", ["browserify", "html2js", "concat:javascript", "sass", "concat:css"]);

    grunt.registerTask("development", ["build", "copy", "http-server","watch"]);
    grunt.registerTask("release", ["clean:all", "build", "copy", "uglify", "clean:dev"]);

    grunt.registerTask("default", ["development"]);
};