const jwt = require("jsonwebtoken");


const checkAuthorization = async (req, res, next) => {
  if (req.url === "/auth/login" || req.url === "/auth/forgot_password") {
    next();
  } else {
    try {
      let authorizationString = req.headers["authorization"];
  
      if (authorizationString === undefined) {
      } else {
        let token = authorizationString.substring("Bearer ".length);
        await verifyToken(req, token);
        next();
      }
    } catch (e) {
      next(e);
    }
  }
};

const verifyToken = (req, token) => {

  return new Promise((resolve, reject) => {
    jwt.verify(
      token,
      `${process.env.TOKEN_SECRET_KEY}`,
      function (err, decoded) {
        if (err) {
          reject(new Error('INVALID_TOKEN'));
        }
        if (decoded === undefined) {
          reject(new Error("INVALID_TOKEN"));
        }
        
        req.userId = decoded.tokenData.userId;
        return resolve(decoded);
      }
    );
  });
};


module.exports = {
  checkAuthorization,
};
