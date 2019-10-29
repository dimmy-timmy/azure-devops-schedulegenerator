const uuidv4 = require('uuid/v4');
const parser = require('cron-parser');

function createScheduleDefinition(daysToRelease, hour, minute = 0) {
    return {
        schedule: {
            daysToRelease,
            jobId: uuidv4(),
            startHours: hour,
            startMinutes: minute,
            timeZoneId: 'UTC',
            scheduleOnlyWithChanges: false
        },
        triggerType: 2
    }
}

function mapDaysOfWeekToDaysToRelease(daysOfWeek) {
    let daysToRelease = 0;
    for(let day of daysOfWeek) {
        daysToRelease |= Math.pow(2, day - 1);
    }
    return daysToRelease;
}

function generateSchedule(cronPattern) {
    const interval = parser.parseExpression(cronPattern);

    const daysToRelease = mapDaysOfWeekToDaysToRelease(interval._fields.dayOfWeek);

    const triggers = [];

    for (let hour of interval._fields.hour) {
        if (interval._fields.minute.length !== 60) {
            for (let minute of interval._fields.minute) {
                triggers.push(createScheduleDefinition(daysToRelease, hour, minute));
            }
        } else {
            triggers.push(createScheduleDefinition(daysToRelease, hour));
        }
    }
    return triggers;
}

module.exports = {
    generateSchedule
}