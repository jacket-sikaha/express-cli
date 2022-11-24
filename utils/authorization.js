const jwt = require("jsonwebtoken");

// 加密密钥
const jwtKey = "sikara";

// 对除了登录以外接口检验token 的middleware
const checkToken = (req, res, next) => {
  const headers = req.headers;
  const token = headers.authorization?.split(" ")[1];
  // console.log(token);
  jwt.verify(token, jwtKey, (err, payload) => {
    if (err || !token) {
      res.send({
        status: 401,
        message: "验证失败",
      });
    } else {
      req.payload = payload;
      next();
    }
  });
};

module.exports = { checkToken, jwtKey };
