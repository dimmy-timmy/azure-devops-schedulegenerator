const azdev = require('azure-devops-node-api');
const { generateSchedule } = require('./cron-schedule');

exports.command = 'ur <pipeline> <project> <organization>'

exports.describe = 'update release pipeline schedule. Set AZURE_PERSONAL_ACCESS_TOKEN environment variable first'

exports.builder = (yargs) => {
    yargs.positional('pipeline', {
        describe: 'Release definition id',
        type: 'number'
    }).positional('organization', {
        describe: 'Organization url',
        type: 'string'
    }).positional('project', {
        describe: 'Project',
        type: 'string'
    })
}

exports.handler = async (argv) => {
    const triggers = generateSchedule(argv.pattern);
    const token = process.env.AZURE_PERSONAL_ACCESS_TOKEN;
    const authHandler = azdev.getPersonalAccessTokenHandler(token); 
    const connection = new azdev.WebApi(argv.organization, authHandler);
    const releaseApi = await connection.getReleaseApi();
    const releaseDefinition = await releaseApi.getReleaseDefinition(argv.project, argv.pipeline);
    releaseDefinition.triggers = triggers;
    await releaseApi.updateReleaseDefinition(releaseDefinition, argv.project);
}