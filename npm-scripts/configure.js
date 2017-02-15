'use strict';

{
    const boilerplateConfiguration = require('../src/configuration.js');
    const fs = require('fs');

    try {
        fs.accessSync(Configuration.FILE);
    } catch (e) {
        const configuration = new boilerplateConfiguration.Configuration;

        configuration.answers.then(answers => {
            configuration.createFromAnswers(answers);
        });
    }
}