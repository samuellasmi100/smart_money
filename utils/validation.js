const validator = require('validator');
let usersDal = require("../dal/users-dal");


function validateUser(user) {
    if (!user.email) {
        throw new Error( "Email is empty")
    }
    
    if (user.password.length < 5) {
        throw new Error("Password is too short");
    }
    
    // const hasUppercaseOrSpecial = /[A-Z!@#$%^&*(),.?":{}|<>]/.test(user.password);
    // if (!hasUppercaseOrSpecial) {
    //     throw new Error("Password must contain at least one uppercase letter or special character");
    // }
}



async function isAlreadyExists(userRegister) {
    
    if(await usersDal.isAlreadyExist(userRegister)) {
        throw  new Error("Email already exists");
    }
    return true;
}

module.exports = {
    validateUser,
    isAlreadyExists
};