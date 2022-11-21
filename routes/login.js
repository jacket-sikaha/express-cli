var express = require("express");
var router = express.Router();

// 1.导入用于生成JWT字符串的包
const jwt = require("jsonwebtoken");
// 2.导入用于将客户端发送过来的JWT字符串，解析还原成JSON对象的包
const expressJWT = require("express-jwt");

const database = {
  username: "sikara",
  passwd: "1",
};
// 加密密钥
const jwtKey = "sikara";

// 登陆生成jwt expiresIn token有效期
router.post("/login", (req, res) => {
  const { username, passwd } = req.body;
  console.log(req.body);
  if (username === database.username && passwd === database.passwd) {
    jwt.sign({ username }, jwtKey, { expiresIn: "30s" }, (err, token) => {
      //   res.json({ username, message: "登陆成功", token });
      res.send({
        status: 200,
        message: "登陆成功",
        token,
      });
    });
  } else {
    res.send({
      status: 400,
      message: "用户名或密码错误",
    });
  }
});

//登陆后检验token
router.get("/afterlogin", (req, res) => {
  const headers = req.headers;
  const token = headers.authorization?.split(" ")[1];
  console.log(token);
  jwt.verify(token, jwtKey, (err, payload) => {
    if (err || !token) {
      res.send({
        status: 401,
        message: "验证失败",
      });
    } else {
      res.send({
        status: 200,
        message: "认证成功",
        payload,
      });
    }
  });
});

module.exports = router;
