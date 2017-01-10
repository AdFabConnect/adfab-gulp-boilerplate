'use strict';

{
    /**
     * Delete tools containing <name> from the "tools" question
     *
     * @param      {string}  name    The name
     */
    function deleteTools (name) {
        this.filter(function (question, questionIndex) {
            if (question.name !== 'tools') {
                return false;
            }

            question.choices.filter(function (choice, choiceIndex) {
                if (choice.value.indexOf(name) !== -1) {
                    questions[questionIndex].choices.splice(choiceIndex, 1);

                    return true;
                }

                return false;
            });
        });
    }

    /**
     * Convert answers to a configuration object usable by the tasks
     *
     * @param      Object  answers  The answers
     */
    function convertToConfiguration (answers) {
        let
            configuration = {
            vhost: '',
            source: {
                cssWatchFileList: [ '' ],
                cssCompileFileList: [ '' ],
                fontFileList: [ '' ],
                fontIconFileList: [ '' ],
                imageFileList: [ '' ],
                jsEntryFile: [ '' ],
                jsHintFileList: [ '' ],
                libFileList: [ '' ],
                svgFileList: [ '' ],
                viewFileList: [ '' ]
            },
            destination: {
                assetsFolder: '',
                cssFolderName: '',
                cssFileName: '',
                fontsFolderName: '',
                fontIconType: '',
                fontIconFontName: '',
                fontIconFontFolderFile: '',
                fontIconFileName: '',
                imagesFolderName: '',
                jsFolderName: '',
                jsFileName: '',
                libFolderName: '',
                libFileName: '',
                svgSprite: '',
                viewsFolderName: ''
            }
        };

        // Less hinting

        if (typeof answers.lesshintSource !== 'undefined') {
            configuration.source.cssWatchFileList = answers.lesshintSource;
        }

        // SVG font generation

        if (typeof answers.fonticonFontName !== 'undefined') {
            configuration.destination.fontIconFontName = answers.fonticonFontName;
        }

        if (typeof answers.fonticonSvgFiles !== 'undefined') {
            configuration.source.fontIconFileList = answers.fonticonSvgFiles;
        }

        if (typeof answers.fonticonStyleFileFormat !== 'undefined') {
            configuration.destination.fontIconType = answers.fonticonStyleFileFormat;
        }

        if (typeof answers.fonticonStyleFile !== 'undefined') {
            configuration.destination.fontIconFileName = answers.fonticonStyleFile;
        }

        if (typeof answers.fonticonFontsFolder !== 'undefined') {
            configuration.destination.fontIconFontFolderFile = answers.fonticonFontsFolder;
            configuration.destination.fontIconFontPath = answers.fonticonFontsFolder;
        }

        // JS hinting

        if (typeof answers.jshintSource !== 'undefined') {
            configuration.source.jsHintFileList = answers.jshintSource;
        }

        // Font files copy

        if (typeof answers.fontsSource !== 'undefined') {
            configuration.source.fontFileList = answers.fontsSource;
        }

        if (typeof answers.fontsDestination !== 'undefined') {
            configuration.destination.fontsFolderName = answers.fontsDestination;
        }

        // Image files copy

        if (typeof answers.imagesSource !== 'undefined') {
            configuration.source.imageFileList = answers.imagesSource;
        }

        if (typeof answers.imagesDestination !== 'undefined') {
            configuration.destination.imagesFolderName = answers.imagesDestination;
        }

        // Library files copy

        if (typeof answers.libSource !== 'undefined') {
            configuration.source.libFileList = answers.libSource;
        }

        if (typeof answers.libDestinationName !== 'undefined') {
            configuration.destination.libFileName = answers.libDestinationName;
        }

        if (typeof answers.libDestinationPath !== 'undefined') {
            configuration.destination.libFolderName = answers.libDestinationPath;
        }

        // JS transpiling, compilation and minification

        if (typeof answers.scriptsSource !== 'undefined') {
            configuration.source.jsEntryFile = answers.scriptsSource;
        }

        if (typeof answers.scriptsDestinationName !== 'undefined') {
            configuration.destination.jsFileName = answers.scriptsDestinationName;
        }

        if (typeof answers.scriptsDestinationPath !== 'undefined') {
            configuration.destination.jsFolderName = answers.scriptsDestinationPath;
        }

        // Browser synchronization

        if (typeof answers.serveHost !== 'undefined') {
            configuration.vhost = answers.serveHost;
        }

        // SVG spriting

        if (typeof answers.svgSource !== 'undefined') {
            configuration.source.svgFileList = answers.svgSource;
        }

        if (typeof answers.svgDestination !== 'undefined') {
            configuration.destination.svgSprite = answers.svgDestination;
        }

        // Views minification

        if (typeof answers.viewsSource !== 'undefined') {
            configuration.source.viewFileList = answers.viewsSource;
        }

        if (typeof answers.viewsDestination !== 'undefined') {
            configuration.destination.viewsFolderName = answers.viewsDestination;
        }

        if (typeof answers.viewsMinification !== 'undefined') {
            configuration.minifyHTML = answers.viewsMinification;
        }

        return configuration;
    }

    var
        inquirer = require('inquirer'),
        questions = [
            {
                type: 'list',
                name: 'css',
                message: 'Which CSS preprocessor would you like to use?',
                choices: [
                    {
                        name: 'SASS',
                        value: 'sass'
                    },
                    {
                        name: 'LESS',
                        value: 'less'
                    }
                ],
                filter: function (css) {
                    // If the user chose SASS preprocessor, we got to delete
                    // LESS-related options from the next question

                    if (css === 'sass') {
                        deleteTools.call(questions, 'less');
                    }

                    return css;
               }
            },
            {
                type: 'checkbox',
                name: 'tools',
                message: 'Which other functionality would you like to have?',
                choices: [
                    {
                        name: 'LESS Hinting',
                        value: 'lesshint',
                        checked: true
                    },
                    {
                        name: 'SVG font generation',
                        value: 'fonticon'
                    },
                    {
                        name: 'JS Hinting',
                        value: 'jshint'
                    },
                    {
                        name: 'Font files copy',
                        value: 'fonts'
                    },
                    {
                        name: 'Image files copy',
                        value: 'images'
                    },
                    {
                        name: 'Library files copy',
                        value: 'lib'
                    },
                    {
                        name: 'JS transpiling, compilation and minification',
                        value: 'scripts'
                    },
                    {
                        name: 'Browser synchronization',
                        value: 'serve'
                    },
                    {
                        name: 'SVG spriting',
                        value: 'svg'
                    },
                    {
                        name: 'Views minification',
                        value: 'views'
                    }
                ]
            },
            {
                type: 'input',
                name: 'lesshintSource',
                message: '[LESS Hinting] Where are the LESS files?',
                when: answers => answers.tools.indexOf('lesshint') !== -1
            },
            {
                type: 'input',
                name: 'fonticonFontName',
                message: '[SVG font generation] What does the name of the font have to be ?',
                when: answers => answers.tools.indexOf('fonticon') !== -1
            },
            {
                type: 'input',
                name: 'fonticonSvgFiles',
                message: '[SVG font generation] Where are the SVG files?',
                when: answers => answers.tools.indexOf('fonticon') !== -1
            },
            {
                type: 'list',
                name: 'fonticonStyleFileFormat',
                message: '[SVG font generation] In which format would you like the style file to be?',
                choices: ['CSS', 'LESS', 'SCSS'],
                filter: function (val) {
                    return val.toLowerCase();
                },
                when: answers => answers.tools.indexOf('fonticon') !== -1
            },
            {
                type: 'input',
                name: 'fonticonStyleFile',
                message: '[SVG font generation] Where should the destination style file go?',
                when: answers => answers.tools.indexOf('fonticon') !== -1
            },
            {
                type: 'input',
                name: 'fonticonFontsFolder',
                message: '[SVG font generation] Where is the destination fonts folder?',
                when: answers => answers.tools.indexOf('fonticon') !== -1
            },
            {
                type: 'input',
                name: 'jshintSource',
                message: '[JS Hinting] Where are the JS files?',
                when: answers => answers.tools.indexOf('jshint') !== -1
            },
            {
                type: 'input',
                name: 'fontsSource',
                message: '[Font files copy] Where are the font files?',
                when: answers => answers.tools.indexOf('fonts') !== -1
            },
            {
                type: 'input',
                name: 'fontsDestination',
                message: '[Font files copy] Where do the font files have to go?',
                when: answers => answers.tools.indexOf('fonts') !== -1
            },
            {
                type: 'input',
                name: 'imagesSource',
                message: '[Image files copy] Where are the image files?',
                when: answers => answers.tools.indexOf('images') !== -1
            },
            {
                type: 'input',
                name: 'imagesDestination',
                message: '[Image files copy] Where do the image files have to go?',
                when: answers => answers.tools.indexOf('images') !== -1
            },
            {
                type: 'input',
                name: 'libSource',
                message: '[Library files copy] Where are the library files?',
                when: answers => answers.tools.indexOf('lib') !== -1
            },
            {
                type: 'input',
                name: 'libDestinationName',
                message: '[Library files copy] What name should the concatenated libs file have?',
                when: answers => answers.tools.indexOf('lib') !== -1
            },
            {
                type: 'input',
                name: 'libDestinationPath',
                message: '[Library files copy] Where do this file have to go?',
                when: answers => answers.tools.indexOf('lib') !== -1
            },
            {
                type: 'input',
                name: 'scriptsSource',
                message: '[JS transpiling, compilation and minification] Where is the JS entry file?',
                when: answers => answers.tools.indexOf('scripts') !== -1
            },
            {
                type: 'input',
                name: 'scriptsDestinationName',
                message: '[JS transpiling, compilation and minification] What should the destination file name be?',
                when: answers => answers.tools.indexOf('scripts') !== -1
            },
            {
                type: 'input',
                name: 'scriptsDestinationPath',
                message: '[JS transpiling, compilation and minification] Where should the destination file go?',
                when: answers => answers.tools.indexOf('scripts') !== -1
            },            {
                type: 'input',
                name: 'serveHost',
                message: '[Browser synchronization] What is the name of the host to serve?',
                when: answers => answers.tools.indexOf('serve') !== -1
            },
            {
                type: 'input',
                name: 'svgSource',
                message: '[SVG spriting] Where are the SVG files?',
                when: answers => answers.tools.indexOf('svg') !== -1
            },
            {
                type: 'input',
                name: 'svgDestination',
                message: '[SVG spriting] Where should the sprite go?',
                when: answers => answers.tools.indexOf('svg') !== -1
            },
            {
                type: 'input',
                name: 'viewsSource',
                message: '[Views minification] Where are the views files?',
                when: answers => answers.tools.indexOf('views') !== -1
            },
            {
                type: 'input',
                name: 'viewsDestination',
                message: '[Views minification] Where should the views files end up?',
                when: answers => answers.tools.indexOf('views') !== -1
            },
            {
                type: 'confirm',
                name: 'viewsMinification',
                message: '[Views minification] Minify HTML?',
                default: true,
                when: answers => answers.tools.indexOf('views') !== -1
            },
        ]
    ;

    inquirer.prompt(questions).then(function (answers) {
        let fs = require('fs');

        fs.writeFile(
            '../../gulp-config.js',
            JSON.stringify(convertToConfiguration(answers)),
            function(err) {
                if (err) {
                    return console.error(err);
                } else {
                    console.log('The configuration was successfully saved.');
                }
            }
        );
    });
}