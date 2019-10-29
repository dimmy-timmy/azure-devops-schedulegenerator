
const parser = require('cron-parser');
const { createSchedule, mapDaysOfWeekToDaysToRelease } = require('./helpers')
const cronPattern = process.argv[2];
const filePath = process.argv[3] || './triggers.json';

const interval = parser.parseExpression(cronPattern);

const daysToRelease = mapDaysOfWeekToDaysToRelease(interval._fields.dayOfWeek);

const triggers = [];

for (let hour of interval._fields.hour) {
    if(interval._fields.minute.length !== 60) {
        for(let minute of interval._fields.minute) {
            triggers.push(createSchedule(daysToRelease, hour, minute));
        }
    } else {
        triggers.push(createSchedule(daysToRelease, hour));
    }
}

const fs = require('fs');

fs.writeFile(filePath, JSON.stringify(triggers), () => {
    console.log('complete')
});

