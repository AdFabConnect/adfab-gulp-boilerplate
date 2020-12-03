'use strict';

var fs = require('fs');
var ncp = require('ncp').ncp;
var prependFile = require('prepend-file');
var pkg = require('../package.json');
var prompt = require('prompt');
var jsonConfig = require('../postinstall/gulp-config.json');

class PostInstall {
    constructor() {
        // Checks if gulp-config.json already exists. If it exists, ignores post install process
        if(this.fsExistsSync('../../gulp-config.json')) {
            return;
        }
        
        this.userData = {};
        this.preprocessorList = {
            'less': {},
            'sass': {},
            'none': {}
        }

        this.technoList = {
            'magento': {
                'prompt': [{
                    name: 'packageName',
                    description: 'Package name',
                    type: 'string',
                    required: true
                },
                {
                    name: 'themeName',
                    description: 'Theme name',
                    type: 'string',
                    required: true
                }]
            },
            'symfony': {},
            'drupal': {
                'prompt': [{
                    name: 'themeName',
                    description: 'Theme name',
                    type: 'string',
                    required: true
                }]
            },
            'wordpress': {
                'prompt': [{
                    name: 'themeName',
                    description: 'Theme name',
                    type: 'string',
                    required: true
                }]
            },
            'js13k': {},
            'other': {}
        };

        var headerContent = ['/**',
            ' * This file is generated. Please don\'t update it',
            ' * ' + pkg.name + ' - ' + pkg.description,
            ' * @version v' + pkg.version,
            ' * @link ' + pkg.homepage,
            ' * @license ' + pkg.license,
            ' */',
            '',
            ''].join('\n');
        
        //Where "src" folder is and have to be place
        this.copyFileList = [
            {
                input: 'postinstall/gulpfile.js',
                output: '../../gulpfile.js',
                force: true,
                prepend: headerContent
            },
            {
                input: 'postinstall/gulp-config.json',
                output: '../../gulp-config.json'
            },
            {
                input: 'postinstall/.editorconfig',
                output: '../../.editorconfig'
            },
            {
                input: 'postinstall/.eslintrc.json',
                output: '../../.eslintrc.json'
            },
        ];
        
        this.initPrompt();
    }
    
    /*
     * Starts to prompt user to get project informations (preprocessor, project type, theme...)
     */
    initPrompt() {
        console.log('Adfab Gulp boilerplate postinstall');
        this.DEFAULT_SOURCE_FOLDER = '/sources';
        this.ACCEPT_RESULT_LIST = ['', 'y', 'yes'];
        prompt.start('');
        prompt.get([
            {
                name: 'preprocessor',
                description: 'CSS preprocessor (' + Object.keys(this.preprocessorList).join(', ') +')',
                type: 'string',
                pattern: '^(' + Object.keys(this.preprocessorList).join('|') + ')$',
                required: true
            },{
                name: 'techno',
                description: 'Project type (' + Object.keys(this.technoList).join(', ') + '...)',
                type: 'string',
                pattern: '^(' + Object.keys(this.technoList).join('|') + ')$',
                required: true
            }
        ], (err, result) => {
            this.userData = result;
            if(this.technoList[this.userData.techno].hasOwnProperty('prompt')) {
                prompt.start('');
                prompt.get(this.technoList[this.userData.techno].prompt, (err, result) => {
                    for(var technoPrompt of this.technoList[this.userData.techno].prompt) {
                        this.userData[technoPrompt.name] = result[technoPrompt.name];
                    }
                    this.selectSourcesFolder();
                });
            } else {
                this.selectSourcesFolder();
            }
        }); 
    }

    /*
     * Prompts the user to get source and destination folders
     */
    selectSourcesFolder() {
        this.setTechnoConfig();
        prompt.start('');
        prompt.get([{
            name: 'source',
            description: 'Sources folder (' + this.DEFAULT_SOURCE_FOLDER + ')',
            type: 'string'
        }], (err, result) => {
            this.userData.source = result.source || this.DEFAULT_SOURCE_FOLDER;
            var destination = '/';
            if(this.technoConfig.hasOwnProperty('destinationRoot')) {
                destination = this.technoConfig.destinationRoot;
            }
            prompt.start('');
            prompt.get([{
                name: 'destination',
                description: 'Destination folder (' + destination + ')',
                type: 'string'
            }], (err, result) => {
                this.userData.destination = result.destination || destination;
                this.showSummary();
            });
        });
    }
    
    /*
     * Sets chosen techno config
     */
    setTechnoConfig() {
        if(this.userData.techno === 'other') {
            this.technoConfig = {};
            return;
        }
        var technoJsonConfig = require('../postinstall/gulp-config-' + this.userData.techno + '.json');
        var technoConfig = JSON.stringify(technoJsonConfig);
        technoConfig = technoConfig.replace('{{themeName}}', this.userData.themeName).replace('{{packageName}}', this.userData.packageName);
        this.technoConfig = JSON.parse(technoConfig);
    }

    /*
     * Displays a summary of data given by user. If ok, performs postinstall, else 
     */
    showSummary() {
        console.log('Config summary:');
        console.log('    Css preprocessor: ' + this.userData.preprocessor);
        if(this.technoList[this.userData.techno].hasOwnProperty('prompt')) {
            for(var technoPrompt of this.technoList[this.userData.techno].prompt) {
                console.log('    ' + technoPrompt.description + ': ' + this.userData[technoPrompt.name]);
            }
        }
        console.log('    Source folder: ' + this.userData.source);
        console.log('    Destination folder: ' + this.userData.destination);
        prompt.get([{
            name: 'confirm',
            description: 'Confirm config? (y/n)',
            type: 'string'
        }], (err, result) => {
            if(['n', 'no'].indexOf(result.confirm) >= 0) {
                this.initPrompt();
            } else {
                this.performPostinstall();
            }
        });
    }

    /*
     * Performs the postinstall after all data prompted
     */
    performPostinstall() {
        this.generateConfigFile();
        this.copyFiles();
    }

    mergeConf(og, so) {
        for (var key in so) {
            if (typeof (og[key]) === 'object') {
                this.mergeConf(og[key], so[key]);
            } else {
                if (og[key] || typeof (og[key]) === 'boolean') {
                    og[key] = so[key];
                }
            }
        }
        return og;
    }

    /*
     * Generates gulp-config.json with params sets by user
     */
    generateConfigFile() {
        var finalConfig = this.mergeConf(jsonConfig, this.technoConfig);
        this.folderFilter = '';

        // adds files to copy or tasks to remove
        if (this.userData.preprocessor === 'less') {
            this.copyFileList.push({
                input: 'postinstall/.lesshintrc',
                output: '../../.lesshintrc'
            });
            this.folderFilter = 'sass';
        } else {
            delete finalConfig.tasks.less;
            delete finalConfig.tasks.lesshint;
        }

        if (this.userData.preprocessor === 'sass') {
            this.copyFileList.push({
                input: 'postinstall/.sass-lint.yml',
                output: '../../.sass-lint.yml'
            });
            this.folderFilter = 'less';
        } else {
            delete finalConfig.tasks.sass;
            delete finalConfig.tasks.sasslint;
        }

        // Removes disabled tasks
        for(var task in finalConfig.tasks) {
            if(finalConfig.tasks[task].hasOwnProperty('disabled')) {
                delete finalConfig.tasks[task];
            }
        }

        delete finalConfig.tasks.postcss;
    }

    copyFiles() {

        // Where "src" folder is and have to be place
        var assetsInput = 'postinstall/src';
        var assetsOutput = '../../' + this.userData.source;

        // Copy some unitary files
        for(var file of this.copyFileList) {
            if (file.force || !this.fsExistsSync(file.output)) {
                fs.createReadStream(file.input).pipe(fs.createWriteStream(file.output));
                if(file.prepend) {
                    prependFile(file.output, file.prepend);
                }
            } 
        }

        // Copy source folder in project if not exists yet
        var filter = new RegExp('^(?:(?!\.gitkeep' + (this.folderFilter ? '|' + this.folderFilter : '') + ').)*$');
        if (!this.fsExistsSync(assetsOutput)) {
            ncp.limit = 16;
            ncp(assetsInput, assetsOutput, {
                filter: filter
            }, function (err) {
                if (err) {
                    return console.error(err);
                }
            });
        }
    }

    fsExistsSync(myDir) {
        try {
            fs.accessSync(myDir);
            return true;
        } catch (e) {
            return false;
        }
    }
}

new PostInstall();
