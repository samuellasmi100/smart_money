
const express = require("express");
const cors = require('cors');
const usersController = require("./controllers/users-controller");
const logsController = require("./controllers/logs-controller");
const categoriesController = require("./controllers/categories-controller");
const incomesController = require("./controllers/incomes-controller");
const server = express();
const checkAuthorizationMiddleware = require("./middleware/checkAuthorization");
const RabbitConnectionManager = require("./message_stream/RabbitMQConnectionManager");
const init_rabbit_queues = require("./utils/rabbitmq/init");

server.use(cors());
server.use(express.json());

server.use("/users", usersController);
server.use(checkAuthorizationMiddleware.checkAuthorization);
server.use("/logs", logsController);
server.use("/categories",categoriesController);
server.use("/income",incomesController);


const launchServer = async () => {
    await RabbitConnectionManager.initialize();
    await init_rabbit_queues.init_queues();
    server.listen(process.env.REST_API_PORT, () =>
      console.log(`The Main Server is running on ${process.env.REST_API_PORT}`)
    );
};
  launchServer();
