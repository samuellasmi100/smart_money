let incomesDal = require("../dal/incomes-dal");

async function getIncomes() {
  let incomes = await incomesDal.getIncomes();
  return incomes;
}

module.exports = {
  getIncomes,
};
