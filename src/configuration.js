'use strict';

class Configuration {
    constructor () {
        this.inquirer      = require('inquirer');
        this.fs            = require('fs');
        this.rx            = require('rx');
        this.everyTasks    = [];
        this.filteredTasks = [];
        this.included      = [];
        this.excluded      = [];
        this.tasksNumber   = 0;
    }

    get FILE () {
        return 'boilerplate-configuration.json';
    }

    get tasks () {
        if (this.everyTasks.length !== 0) {
            return this.everyTasks;
        }

        const
            GULP_TASKS_PATH = 'gulp-tasks/',
            fs              = this.fs,
            taskFiles       = fs.readdirSync(GULP_TASKS_PATH)
        ;

        let tasks = [];

        for (let taskFile of taskFiles) {
            try {
                const
                    taskFileDescription = fs.readFileSync(
                        GULP_TASKS_PATH + taskFile + '/description.json'
                    ),
                    taskDescription = JSON.parse(taskFileDescription)
                ;

                if (taskDescription.isRepeatable) {
                    taskDescription.occurenceNumber = 0;
                }

                tasks.push(taskDescription);
            } catch (e) {}
        }

        this.everyTasks = tasks;

        return tasks;
    }

    getTaskByName (taskName) {
        const
            i = 0,
            tasks = this.tasks,
            tasksNumber = tasks.length
        ;

        for (
            ;
            i < tasksNumber
            && tasks[i].name !== taskName;
            i++
        );

        return tasks[i];
    }

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

    promptQuestion (question) {
        if (question.name.match(/task\d+/)) {
            if (question.answer === '') {
                this.subject.onCompleted();

                return;
            }
        } else {
            return;
        }

        const task = this.getTaskByName(question.answer);

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

            return true;
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

        return true;
    }

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

    formatAnswers (answers) {
        delete answers.task;

        const
            tasks = this.tasks
        ;

        let configuration = [];

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

                if ( ! found) {
                    configuration.push({
                        name: answer
                    });
                }

                continue;
            }

            const
                task = this.getTaskByName(taskName),
                taskIsRepeatable = (
                    typeof task.isRepeatable !== 'undefined'
                    && task.isRepeatable
                ),
                configurationsNumber = configuration.length,
                i = 0
            ;


            for (
                i = 0;
                i < configurationsNumber
                && configuration[i].name !== taskName;
                i++
            );

            if (i !== configurationsNumber) {
                const taskConfiguration = configuration[i];

                if ( ! taskIsRepeatable) {
                    taskConfiguration[chunks[1]] = answer;
                } else {
                    const
                        taskOptionsNumber =
                            taskConfiguration.options.length,
                        optionIndex = parseInt(chunks[1])
                    ;

                    if (optionIndex === taskOptionsNumber) {
                        taskConfiguration.options.push({});
                    }

                    taskConfiguration.options[optionIndex][chunks[2]] =
                        answer;
                }
            } else {
                let taskConfiguration = {
                    name: task.name
                };

                if ( ! taskIsRepeatable) {
                    taskConfiguration[chunks[1]] = answer;
                } else {
                    let option = {};
                    option[chunks[2]] = answer;
                    taskConfiguration.options = [option];
                }

                configuration.push(taskConfiguration);
            }
        }

        return configuration;
    }

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
                JSON.stringify(this.formatAnswers(answers), null, 4),
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