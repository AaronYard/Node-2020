// 定义 权限验证（token)中间件
const jsonwebtoken = require('jsonwebtoken')

module.exports = (req, res, next) => {
      // 从请求头中拿到用户传递过来的 token
    const token = req.get('authorization')
    if (token) {
      jsonwebtoken.verify(token, 'mygod', async (err, data) => {
        if (err) {
          res.status(401).send('身份验证失败')
        } else {
          // 中间件，可以在 req 与 res 身上添加属性或方法
          // data 也就是 token数据 (包含 userId)，添加到 req中，让在创建帖子时获取到 userId，并发送请求
          req.auth = data
          next()     // next()进行下一步处理 ，比如 新增帖子，删除帖子

        }
      })
    } else {
      res.status(401).send('请携带token')
    }
}