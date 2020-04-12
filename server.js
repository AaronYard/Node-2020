const express = require('express')
const app = express()
// 引入 express-async-errors, 使得 try,catch 支持
require('express-async-errors')

// 引入 抽离的路由文件
const postRouter = require('./routers/postRouter')

// 1. req.body 中间件
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// 2. 静态资源托管处理
app.use(express.static('./public'))
// 3. 调用路由文件，并设置前缀
app.use('/posts', postRouter)
// 4. 去掉路由中 try,catch， 统一错误处理
app.use(function (err, req, res, next) {
  console.error(err)
  res.status(500).send(err.message)
})


app.listen(3000, ()=>{
  console.log('服务器启动成功');
})