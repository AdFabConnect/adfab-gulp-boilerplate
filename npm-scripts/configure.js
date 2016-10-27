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
                    delete questions[questionIndex].choices[choiceIndex];

                    return true;
                }

                return false;
            });
        });
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
                        name: 'SVG font generation for LESS',
                        value: 'fonticonless'
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
                message: 'Where are the LESS files?',
                when: answers => answers.tools.indexOf('lesshint') !== -1
            },
            {
                type: 'input',
                name: 'fonticonlessFontName',
                message: 'What does the name of the font have to be ?',
                when: answers => answers.tools.indexOf('fonticonless') !== -1
            },
            {
                type: 'input',
                name: 'fonticonlessSvgFiles',
                message: 'Where are the SVG files?',
                when: answers => answers.tools.indexOf('fonticonless') !== -1
            },
            {
                type: 'input',
                name: 'fonticonlessLessFiles',
                message: 'Where is the destination LESS file?',
                when: answers => answers.tools.indexOf('fonticonless') !== -1
            },
            {
                type: 'input',
                name: 'fonticonlessFontsFolder',
                message: 'Where is the destination fonts folder?',
                when: answers => answers.tools.indexOf('fonticonless') !== -1
            },
            {
                type: 'input',
                name: 'jshintSource',
                message: 'Where are the JS files?',
                when: answers => answers.tools.indexOf('jshint') !== -1
            },
            {
                type: 'input',
                name: 'fontsSource',
                message: 'Where are the font files?',
                when: answers => answers.tools.indexOf('fonts') !== -1
            },
            {
                type: 'input',
                name: 'fontsDestination',
                message: 'Where do the font files have to be?',
                when: answers => answers.tools.indexOf('fonts') !== -1
            },
            {
                type: 'input',
                name: 'imagesSource',
                message: 'Where are the image files?',
                when: answers => answers.tools.indexOf('images') !== -1
            },
            {
                type: 'input',
                name: 'imagesDestination',
                message: 'Where do the image files have to be?',
                when: answers => answers.tools.indexOf('images') !== -1
            },
            {
                type: 'input',
                name: 'libSource',
                message: 'Where are the library files?',
                when: answers => answers.tools.indexOf('lib') !== -1
            },
            {
                type: 'input',
                name: 'libDestination',
                message: 'Where do the library files have to be?',
                when: answers => answers.tools.indexOf('lib') !== -1
            },
            {
                type: 'input',
                name: 'scriptsSource',
                message: 'Where are the JS files?',
                when: answers => answers.tools.indexOf('scripts') !== -1
            },
            {
                type: 'input',
                name: 'scriptsDestination',
                message: 'Where should the destination file be?',
                when: answers => answers.tools.indexOf('scripts') !== -1
            },
            {
                type: 'input',
                name: 'serveHost',
                message: 'What is the name of the host to serve?',
                when: answers => answers.tools.indexOf('serve') !== -1
            },
            {
                type: 'input',
                name: 'svgSource',
                message: 'Where are the SVG files?',
                when: answers => answers.tools.indexOf('svg') !== -1
            },
            {
                type: 'input',
                name: 'svgDestination',
                message: 'Where should the sprite be?',
                when: answers => answers.tools.indexOf('svg') !== -1
            },
            {
                type: 'input',
                name: 'viewsSource',
                message: 'Where are the views files?',
                when: answers => answers.tools.indexOf('views') !== -1
            },
            {
                type: 'input',
                name: 'viewsDestination',
                message: 'Where should the views files end up?',
                when: answers => answers.tools.indexOf('views') !== -1
            }
        ]
    ;

    inquirer.prompt(questions).then(function (answers) {
        console.log(answers);
    });
}