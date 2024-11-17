const authQueue = require('./authQueue')
const logQueue = require("./logsQueue")

const init_queues = async () => {
    try {
      await authQueue.initQueue()
      await logQueue.initQueue()
    } catch (error) {
        console.log(error)
      console.error(`failed to init rabbit queues, error: ${error}`)
    }
  }
  
  module.exports = {
    init_queues,
  }
  