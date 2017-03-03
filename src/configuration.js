'use strict';

/**
 * Configuration class
 */
class Configuration {
    /**
     * Configuration constructor
     *
     * @return {undefined}
     */
    constructor () {
        this.inquirer      = require('inquirer');
        this.fs            = require('fs');
        this.rx            = require('rx');
        this.everyTasks    = null;
        this.filteredTasks = [];
        this.included      = [];
        this.excluded      = [];
        this.tasksNumber   = 0;
    }

    /**
     * Get configuration file name
     *
     * @return {string} The configuration file name
     */
    get FILE () {
        return 'boilerplate-configuration.json';
    }

    /**
     * Get every tasks
     *
     * @return {array} Every tasks
     */
    get tasks () {
        // Return the everyTasks property if it has been set
        if (this.everyTasks.length !== null) {
            return this.everyTasks;
        }

        const
            GULP_TASKS_PATH  = 'gulp-tasks/',
            fs               = this.fs,
            tasksDirectories = fs.readdirSync(GULP_TASKS_PATH)
        ;

        let tasks = [];

        for (let taskDirectory of tasksDirectories) {
            try {
                const
                    taskDescriptionFile = fs.readFileSync(
                        GULP_TASKS_PATH + taskDirectory + '/description.json'
                    ),
                    taskDescription = JSON.parse(taskDescriptionFile)
                ;

                if (taskDescription.isRepeatable) {
                    taskDescription.occurenceNumber = 0;
                }

                tasks.push(taskDescription);
            } catch (e) {}
        }

        // Set the everyTasks property so we don't have to do this every time
        this.everyTasks = tasks;

        return tasks;
    }

    /**
     * Get a task by its name
     *
     * @param  {string} The task name
     *
     * @return {Object} The task
     */
    getTaskByName (taskName) {
        const
            tasks = this.tasks,
            tasksNumber = tasks.length
        ;
        let i = 0;

        for (
            ;
            i < tasksNumber
            && tasks[i].name !== taskName;
            i++
        );

        return tasks[i];
    }

    /**
     * Check if a task is eligible for usage
     *
     * @param  {Object} The task to test
     *
     * @return {Boolean} Is the task available?
     */
    isTaskAvailable (task) {
        const
            included = this.included,
            excluded = this.excluded
        ;

        if (
            included.indexOf(task.name) !== -1
            && (
                typeof task.isRepeatable === 'undefined'
                || task.isRepeatable !== true
            )
        ) {
            return false;
        }

        if (excluded.indexOf(task.name) !== -1) {
            return false;
        }

        if (
            typeof task.requires !== 'undefined'
            // TODO: handle requires as an array
            && included.indexOf(task.requires) === -1
        ) {
            return false;
        }

        return true;
    }

    /**
     * Get the task-choosing question
     *
     * @return {Object} The task-choosing question
     */
    get tasksQuestion () {
        const
            tasks = this.tasks.filter(this.isTaskAvailable.bind(this)),
            tasksQuestion = {
                type: 'list',
                name: 'task' + this.tasksNumber,
                message: 'What do you want the boilerplate to do for you?',
                choices: []
            },
            thatsAll = {
                name: 'That\'s all, thank you',
                value: ''
            }
        ;

        tasks.forEach(task => {
            tasksQuestion.choices.push({
                name: task.whatDoesItDo,
                value: task.name
            });
        });

        tasksQuestion.choices.push(thatsAll);

        this.tasksNumber++;

        return tasksQuestion;
    }

    /**
     * Prompt the question
     *
     * @param  {object} question - The question to prompt
     * @param  {string} question.name - The question name
     * @param  {string} question.answer - The answer to the question
     *
     * @return {undefined}
     */
    promptQuestion (question) {
        if (question.name.match(/task\d+/)) {
            if (question.answer === '') {
                this.subject.onCompleted();

                return;
            }
        } else {
            return;
        }

        const task = this.configuration.getTaskByName(question.answer);

        this.configuration.included.push(task.name);

        if (
            Object.prototype.toString.call(task.excludes)
            === '[object Array]'
        ) {
            this.configuration.excluded =
                this.configuration.excluded.concat(task.excludes);
        } else if (typeof task.excludes === 'string') {
            this.configuration.excluded.push(task.excludes);
        }

        if (
            typeof task.questions === 'undefined'
            || task.questions.length === 0
        ) {
            this.subject.onNext(this.configuration.tasksQuestion);

            return;
        }

        task.questions.forEach(question => {
            let questionName = question.name;

            question.name = task.name;

            if (task.isRepeatable) {
                question.name += '.' + task.occurenceNumber;

                if (questionName.indexOf('.') !== -1) {
                    const questionParts = questionName.split('.');

                    questionName = questionParts[
                        questionParts.length - 1
                    ];
                }
            }

            question.name += '.' + questionName;

            this.subject.onNext(question);
        });

        if (task.isRepeatable) {
            task.occurenceNumber++;
        }

        this.subject.onNext(this.configuration.tasksQuestion);

        return;
    }

    /**
     * Get the answers to the configuration questions
     *
     * @return {Promise} The answers
     */
    get answers () {
        const
            subject = new this.rx.Subject(),
            prompt  = this.inquirer.prompt(subject),
            answers = new Promise(
                (resolve, reject) => {
                    prompt.ui.process.subscribe(
                        this.promptQuestion.bind({
                            configuration: this,
                            subject: subject
                        }),
                        error => {
                            reject(error);
                        },
                        answers => {
                            resolve(prompt.ui.answers);
                        }
                    );

                    subject.onNext(this.tasksQuestion);
                }
            )
        ;

        return answers;
    }

    /**
     * Format the answers to a usable configuration object
     *
     * @param  {array} The answers given to the configuration questions
     *
     * @return {Object} A configuration object
     */
    formatAnswers (answers) {
        const
            tasks = this.tasks,
            configuration = {}
        ;

        for (const answerIndex in answers) {
            const
                answer = answers[answerIndex],
                chunks = answerIndex.split('.'),
                taskName = chunks[0]
            ;

            if (taskName.match(/task\d+/)) {
                if (answer === '') {
                    break;
                }

                let found = false;

                for (const answerIndex in answers) {
                    const chunks = answerIndex.split('.');

                    if (chunks[0] === answer) {
                        found = true;

                        break;
                    }
                }

                // If the task has no option, we create an empty object
                // so it's still in the configuration
                if ( ! found) {
                    configuration[answer] = {};
                }

                continue;
            }

            const
                task = this.getTaskByName(taskName),
                taskIsRepeatable = (
                    typeof task.isRepeatable !== 'undefined'
                    && task.isRepeatable
                ),
                taskConfigurationIsInitialized =
                    configuration.hasOwnProperty(taskName)
            ;

            if ( ! taskConfigurationIsInitialized) {
                configuration[taskName] = {};
            }

            const taskConfiguration = configuration[taskName];

            if ( ! taskIsRepeatable) {
                taskConfiguration[chunks[1]] = answer;
            } else {
                if ( ! taskConfigurationIsInitialized) {
                    taskConfiguration.options = [];
                }

                const optionIndex = parseInt(chunks[1]);

                if (optionIndex === taskConfiguration.options.length) {
                    taskConfiguration.options.push({});
                }

                taskConfiguration.options[optionIndex][chunks[2]] = answer;
            }
        }

        return configuration;
    }

    /**
     * Create configuration file from answers
     *
     * @param  {array} The answers given to the configuration questions
     *
     * @return {undefined}
     */
    createFromAnswers (answers) {
        const
            configuration = this.formatAnswers(answers),
            fs = this.fs,
            boilerplateConfigurationFile = '../../' + this.FILE
        ;

        try {
            fs.accessSync(boilerplateConfigurationFile);
        } catch (e) {
            fs.writeFile(
                boilerplateConfigurationFile,
                JSON.stringify(configuration, null, 4),
                function(err) {
                    if (err) {
                        return console.error(err);
                    } else {
                        console.log(
                            'The configuration was successfully saved.'
                        );
                    }
                }
            );
        }
    }
}

exports.Configuration = Configuration;