const router = require("express").Router();
let usersLogic = require("../logic/users-logic");

router.post("/register", async (request, response, next) => {
  let userRegister = request.body;
  try {
    await usersLogic.addUser(userRegister);
    response.json();
  } catch (error) {
    return next(error);
  }
});

router.post("/login", async (request, response, next) => {

  let userLogin = request.body;
  try {
    let successFullLogin = await usersLogic.login(userLogin);
    console.log(successFullLogin)
    response.json(successFullLogin);
  } catch (error) {
    return next(error);
  }
});


module.exports = router;
