const uuidv4 = require('uuid/v4');

function createSchedule(daysToRelease, hour, minute = 0) {
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

module.exports = {
    createSchedule,
    mapDaysOfWeekToDaysToRelease
}