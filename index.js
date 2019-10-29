
const yargs = require('yargs');

const argv = yargs
    .command(require('./generate-json-file'))
    .command(require('./update-release-pipeline'))
    .option('pattern', {
        alias: 'p',
        description: 'Cron pattern for schedule',
        type: 'string',
    })
    .help()
    .alias('help', 'h')
    .demandCommand()
    .argv;

