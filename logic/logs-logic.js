let logsDal = require("../dal/logs-dal");

async function getActivities(userId) {
  let activities = await logsDal.getActivities(userId);
  return activities;
}

async function createUserLog(userLog) {
  let log = await logsDal.createUserLog(userLog);
  return log;
}

module.exports = {
  createUserLog,
  getActivities,
};
