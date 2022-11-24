var express = require("express");

// 1.导入用于生成JWT字符串的包
const jwt = require("jsonwebtoken");
// 2.导入用于将客户端发送过来的JWT字符串，解析还原成JSON对象的包
const expressJWT = require("express-jwt");

const { checkToken, jwtKey } = require("../utils/authorization");
var router = express.Router();

const database = {
  username: "sikara",
  passwd: "1",
};

// 登陆生成jwt expiresIn token有效期
router.post("/login", (req, res) => {
  const { username, passwd } = req.body;
  console.log(req.body);
  if (username === database.username && passwd === database.passwd) {
    // TODO_03:在登录成功之后，调用jwt.sign()方法生成 JWT 字符串。并通过token属性发送给客户端
    // 参数1:用户的信息对象
    // 参数2:加密的秘钥
    // 参数3:配置对象，可以配置当前token的有效期
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
//登陆后的测试请求---配置局部middleware检验token
router.get("/afterlogin", checkToken, (req, res) => {
  res.send({
    status: 200,
    message: "认证成功",
    payload: req.payload,
  });
});

module.exports = router;
