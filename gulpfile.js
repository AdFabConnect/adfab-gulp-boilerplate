'use strict';

{
    const
        boilerplateConfiguration = require('./src/configuration.js'),
        config = require('./boilerplate-configuration.json'),
        gulp = require('gulp'),
        util = require('gulp-util')
    ;

    util.env.config = config;
    util.env.gulp = gulp;

    const
        configuration = new boilerplateConfiguration.Configuration,
        tasks = configuration.tasks,
        sources = [],
        destinations = [],
        tasksNames = []
    ;

    for (let taskIndex in config) {
        const
            taskConfiguration = config[taskIndex],
            taskName = taskConfiguration.name,
            Configuration = new boilerplateConfiguration.Configuration,
            task = Configuration.getTaskByName(taskName)
        ;

        tasksNames.push(taskName);

        gulp.task(
            taskName,
            require('./gulp-tasks/' + taskName + '/' + taskName)
        );

        if (typeof task.isRepeatable !== 'undefined' && task.isRepeatable) {
            task.options.forEach(option => {
                if (typeof option.source !== 'undefined') {
                    sources.push({
                        taskName: task.name,
                        path: option.source
                    });
                }
                if (typeof option.destination !== 'undefined') {
                    destinations.push(option.destination);
                }
            });
        } else {
            if (typeof taskConfiguration.source !== 'undefined') {
                sources.push({
                    taskName: task.name,
                    path: taskConfiguration.source
                });
            }
            if (typeof taskConfiguration.destination !== 'undefined') {
                destinations.push(taskConfiguration.destination);
            }
        }
    }

    gulp.task('clean', callback => {
        if (destinations.length === 0) {
            return;
        }

        del(destinations, callback);
    });

    gulp.task('build', [ 'clean' ], () => {
        return runSequence(tasksNames);
    });

    gulp.task('watch', [ 'build' ], () => {
        if (sources.length === 0) {
            return;
        }

        sources.forEach(source => {
            watch(source.path, function() {
                return runSequence([ source.taskName ]);
            })
        });
    });

    gulp.task('default', [ 'build' ], () => {});
}