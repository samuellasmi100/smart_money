let usersDal = require("../dal/users-dal");
let validation = require("../utils/validation");
const jwt = require("jsonwebtoken");
const Hashes = require("jshashes");
const SHA256 = new Hashes.SHA256();

async function addUser(userRegister) {
  validation.isAlreadyExists(userRegister);
  validation.validateUser(userRegister);
  const hashedPassword = await hashPassword(userRegister.password);
  userRegister.password = hashedPassword;
  await usersDal.addUser(userRegister);
}

async function login(userLogin) {
  let userData = await usersDal.login(userLogin.email);
  const encryptPassword = SHA256.hex(userLogin.password);
  if (userData[0].password !== undefined) {
    if (encryptPassword === userData[0].password) {
      let tokenData = {
        userId: userData[0].id,
      };
      const token = jwt.sign({ tokenData }, `${process.env.TOKEN_SECRET_KEY}`);
      let successfulLogin = { token, name: userData.name };
  
      return successfulLogin;
    } else {
      throw new Error("Failed to connect");
    }
  }
}

async function createUserLog(userLog) {
  return await usersDal.createUserLog(userLog);
}

const hashPassword = async (password) => {
  return (encryptPassword = SHA256.hex(password));
};

module.exports = {
  addUser,
  login,
  createUserLog,
};
