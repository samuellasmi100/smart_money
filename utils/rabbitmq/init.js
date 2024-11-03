const authQueue = require('./authQueue')

const init_queues = async () => {
    try {
      await authQueue.initQueue()
    } catch (error) {
        console.log(error)
      console.error(`failed to init rabbit queues, error: ${error}`)
    }
  }
  
  module.exports = {
    init_queues,
  }
  