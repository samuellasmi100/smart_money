const router = require("express").Router();
let usersLogic = require("../logic/users-logic");
const authQueue = require("../utils/rabbitmq/authQueue")
const uuid = require("uuid").v4;

router.post("/register", async (request, response, next) => {
  let userRegister = request.body;
  try {
    const req_id = uuid();

    const poolData = {
      response
    }
 
    userQueue.addRequest(req_id,poolData)
  
    const messageToQueue = {
      type:"register",
      id: req_id,
      data:{
        userRegister
      }
    }
    userQueue.sendMessageToQueue(messageToQueue)
  } catch (error) {
    return next(error);
  }
});

router.post("/login", async (request, response, next) => {
  let userLogin = request.body;
  try {
    const req_id = uuid();

    const poolData = {
      response
    }
 
    authQueue.addRequest(req_id,poolData)
  
    const messageToQueue = {
      type:"login",
      id: req_id,
      data:{
        userLogin
      }
    }
    authQueue.sendMessageToQueue(messageToQueue)
  } catch (error) {
    return next(error);
  }
});


module.exports = router;
