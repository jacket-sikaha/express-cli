const express = require("express");
const app = express();
const port = 3001;
const loginRouter = require("./routes/login");
const { expressjwt: expressJWT } = require("express-jwt");
const { checkToken, jwtKey } = require("./utils/authorization");
// 两种检验/解析token方法 （二选一）
// 1 utils/authorization里基于jwt包的检验方法
// 2  expressJWT 注意该方法需要返回给服务端的token前缀词得是  Bearer
// 使用app.use()来注册中间件
//  expressJWT({ secret: secretKey }) 就是用来解析Token的中间件
//  .unless({ path: [/^\/api\//]}) 用来指定哪些接口不需要访问权限
// app.use(expressJWT({ secret: jwtKey }).unless({ path: [/^\/api\//] }));
app.use(
  expressJWT({ secret: jwtKey, algorithms: ["HS256"] }).unless({
    path: "/login",
  })
);

// 设置跨域
const cors = require("cors");
app.use(cors());

// 解析 json数据 + post 表单数据的中间件  middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//定义错误级别中间件，可以防止程序崩溃------四个参数，不需要next()
//错误级别中间件必须注册在所有路由之后
const mwError = function (err, req, res, next) {
  //  token解析失败导致的错误
  if (err.name === "UnauthorizedError") {
    return res.send({ status: 401, message: "无效的token" });
  }
  // 其它原因导致的错误
  console.log("服务端发生了错误:", err.message);
  res.send({ status: 500, message: err.message });
};

app.use(loginRouter);
// console.log("loginRouter", loginRouter);

app.get("/", (req, res) => res.send("Hello World!"));
app.post("/a", (req, res) => res.send(req.body));

app.use(mwError); //部署

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
