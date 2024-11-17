const router = require("express").Router();
let logsLogic = require("../logic/logs-logic");

router.post("/", async (request, response, next) => {
  const userId = request.userId;
  let userLog = request.body;
  userLog.userId = userId;

  try {
    const req_id = uuid();

    const poolData = {
      response
    }
 
    logsQueue.addRequest(req_id,poolData)
  
    const messageToQueue = {
      type:"createLog",
      id: req_id,
      data:{
        userLog
      }
    }
    logsQueue.sendMessageToQueue(messageToQueue)
  } catch (error) {
    return next(error);
  }
});

router.get("/", async (request, response, next) => {
  try {
    const req_id = uuid();

    const poolData = {
      response
    }
 
    logsQueue.addRequest(req_id,poolData)
  
    const messageToQueue = {
      type:"getLogs",
      id: req_id,
      data:{
        userLogs
      }
    }
    logsQueue.sendMessageToQueue(messageToQueue)
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
