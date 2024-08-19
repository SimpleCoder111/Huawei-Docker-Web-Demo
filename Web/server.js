const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

// 配置MySQL连接
const db = mysql.createConnection({
  host: "http://1.94.167.76:33060",
  user: "root",
  password: "topsecret",
  database: "testdb",
});

// 连接到MySQL
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySQL connected...");
});

// 创建一个简单的API来处理数据库操作
app.post("/modify-table", (req, res) => {
  let sql = req.body.query;
  db.query(sql, (err, result) => {
    if (err) {
      res.status(500).send(err);
    }
    res.send(result);
  });
});

// 启动服务器
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
