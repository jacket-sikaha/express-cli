// 传统旧插件
const mysql = require("mysql");

// 建立与  MySQL 数据库的连接关系

const dbConfig = {
  host: "127.0.0.1", // 数据库的 IP 地址
  user: "root", // 登录数据库的账号
  password: "123456", // 登录数据库的密码
  database: "datamovie", // 指定要操作哪个数据库
};
const db = mysql.createPool(dbConfig);

// 检测 MySQL 模块能否正常工作
db.query("SELECT 1", (err, results) => {
  if (err) {
    return console.log(err.message);
  }
  console.log(results); // 打印出就算正常
});
