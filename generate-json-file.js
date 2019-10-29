const fs = require('fs');
const { generateSchedule } = require('./cron-schedule');

exports.command = 'gf <filePath>'

exports.describe = 'generate schedule as json file'

exports.builder = (yargs) => {
    yargs.positional('filePath', {
        describe: 'path to file',
        type: 'string',
        default: './triggers.json'
    })
}

exports.handler = (argv) => {
    const triggers = generateSchedule(argv.pattern);
    fs.writeFile(argv.filePath, JSON.stringify(triggers), () => {
        console.log('complete')
    });
}