// 采用新插件 sequelize
const { Sequelize } = require("sequelize");

// 建立与  MySQL 数据库的连接关系

const dbConfig = {
  host: "127.0.0.1", // 数据库的 IP 地址
  user: "root", // 登录数据库的账号
  password: "123456", // 登录数据库的密码
  database: "datamovie", // 指定要操作哪个数据库
};

// 方法 3: 分别传递参数 (其它数据库)
const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.user,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: "mysql" /* 选择 'mysql' | 'mariadb' | 'postgres' | 'mssql' 其一 */,
  }
);

// 测试连接
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
testConnection();
