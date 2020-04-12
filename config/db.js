// 连接数据库
const mongoose = require('mongoose')

// 连接地址：express 为数据库名
const url = 'mongodb://localhost:27017/express'

// 连接
mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> {
    console.log('数据库连接成功');
  })
  .catch((err)=> {
    console.log('数据库连接失败');
    console.log(err);
  })

  // 导出
  module.exports = mongoose