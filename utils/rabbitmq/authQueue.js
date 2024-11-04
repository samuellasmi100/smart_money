const RabbitMQConnectionManager = require("../../message_stream/RabbitMQConnectionManager")
const AUTH_SERVER = process.env.AUTH_SERVER
const SERVER_AUTH = process.env.SERVER_AUTH
const RABBIT_MQ_INSTANCE_NAME = process.env.RABBIT_MQ_INSTANCE_NAME
const POOL_REQ = {}

const addRequest = (req_id, data) => {
  console.log(req_id,"req_id")
  POOL_REQ[req_id] = data
  return
}

const getAndDeleteRequestById = (id) => {
  console.log(id,"id")
  const copyObject = POOL_REQ[id]
  delete POOL_REQ[id]
  return copyObject
}


const initQueue = async () => {
    try {
        const handleMessageFromQueue = async (data) => {
          data = JSON.parse(data.content.toString())
          returnMessageToClient(data)
          return
        }
        RabbitMQConnectionManager.listenToQueueMessages(RABBIT_MQ_INSTANCE_NAME,AUTH_SERVER,handleMessageFromQueue)
    } catch (error) {
    
      console.log(`failed to init api_key queue, error: ${error}`)
    }
 }
 
const returnMessageToClient = async (msg) => {
  const result = getAndDeleteRequestById(msg.id);
  if (result && result.response) {
    const { response } = result;
    if (response && msg.error === true) {
      response.status(msg.code).send(msg.data);
    } else if (response && msg.error === false) {
      response.status(msg.code).send(msg.data);
    }
  }
}

 const sendMessageToQueue = async (data) => {
    try {
        RabbitMQConnectionManager.pushMessageToQueue(RABBIT_MQ_INSTANCE_NAME,SERVER_AUTH, JSON.stringify(data))
    } catch (error) {
      console.log(`failed to init api_key queue, error: ${error}`)

    }
  }
  module.exports = {
    addRequest,
    initQueue,
    sendMessageToQueue
  }