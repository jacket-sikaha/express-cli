const express = require("express");
const app = express();
const port = 3001;
const loginRouter = require("./routes/login");
// 设置跨域
const cors = require("cors");
app.use(cors());

// 解析 json数据 + post 表单数据的中间件  middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//定义错误级别中间件，可以防止程序崩溃------四个参数，不需要next()
//错误级别中间件必须注册在所有路由之后
const mw = function (err, req, res, next) {
  //   console.log(err.message);
  res.send("error:" + err.message);
};

app.use(loginRouter);

app.get("/", (req, res) => res.send("Hello World!"));
app.post("/a", (req, res) => res.send(req.body));

app.use(mw); //部署

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
