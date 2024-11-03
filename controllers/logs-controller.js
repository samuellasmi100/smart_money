const router = require("express").Router();
let logsLogic = require("../logic/logs-logic");

router.post("/", async (request, response, next) => {
  const userId = request.userId;
  let userLog = request.body;
  userLog.userId = userId;

  try {
    await logsLogic.createUserLog(userLog);
    let activities = await logsLogic.getActivities(userId);
    response.json(activities);
  } catch (error) {
    return next(error);
  }
});

router.get("/", async (request, response, next) => {
  try {
    let userId = request.userId;
    let activities = await logsLogic.getActivities(userId);
    response.send(activities);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
