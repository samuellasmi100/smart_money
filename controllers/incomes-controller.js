const router = require("express").Router();
let incomesLogic = require("../logic/incomes-logic");

router.get("/", async (request, response, next) => {
  try {
    let incomes = await incomesLogic.getIncomes();
    response.send(incomes);
  } catch (error) {
    return next(error);
  }
});






module.exports = router;
