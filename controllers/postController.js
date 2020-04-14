// 控制器，暴露一系列中间件方法给到帖子的路由去使用
// 引入 帖子模型
const PostModel = require('../models/PostModel')
const jsonwebtoken = require('jsonwebtoken')

// 查询帖子
exports.index = async (req, res) => {
  // try {
  //   const data =  await PostModel.find()
  //   res.send({code: 0, msg: '查询成功', data})
  // } catch (error) {
  //   console.log(error);
  //   res.send({code: -1, msg: '查询失败'})
  // }
  // 获取前端传递过来的分页的数据 pageNum、pageSize
  const pageNum = parseInt(req.query.pageNum) || 1  // 查询页码
  const pageSize = parseInt(req.query.pageSize) || 2    // 每页条数
  const title = req.query.title  // 获取前端传递过来的搜索的数据 title
  const data = await PostModel.find({ title: new RegExp(title) })
    .skip((pageNum - 1) * pageSize)
    .limit(pageSize)
  const total = await PostModel.find({ title: new RegExp(title) }).countDocuments()
  // 总页数  传给前端
  const totalPage = Math.ceil(total / pageSize)

  res.send({ code: 0, msg: '查询成功', data: { list: data, totalPage: totalPage } })
}

//帖子详情
exports.show = async (req, res) => {
  // 获取 用户传来的帖子 id
  const { id } = req.params
  console.log(id);

  const data = await PostModel.findOne({ _id: id })
  res.send({ code: 0, msg: 'Ok', data })
}

//创建帖子
exports.create = async (req, res) => {
  //   // 从请求头中拿到用户传递过来的 token
  //   const token = req.get('authorization')
  //   if (token) {
  //     jsonwebtoken.verify(token, 'mygod', async (err, data) => {
  //       if (err) {
  //         res.status(401).send('身份验证失败')
  //       } else {
  //         // 获取 用户传来的 请求体
  //         const { title, content } = req.body
  //         await PostModel.create({ title, content })
  //         res.send({ code: 0, msg: '创建成功' })
  //       }
  //     })
  //   } else {
  //     res.status(401).send('请携带token')
  //   }
  // }

  // 获取 auth中间件中 新增在 req的token ，从中拿到 userId
  const {userId} = req.auth
  req.body.userId = userId
  // req.body中包含 userId, 用户传递的 title, content，发送请求
  await PostModel.create(req.body)
  res.send({ code: 0, msg: '创建成功' })
}

//更新
exports.update = async (req, res) => {
  // 获取帖子 id
  const { id } = req.params
  await PostModel.updateOne({ _id: id }, req.body)
  res.send({ code: 0, msg: '更新成功' })
}

//删除
exports.remove = async (req, res) => {
  // 获取 删除的帖子 id
  const { id } = req.params
  await PostModel.deleteOne({ _id: id })
  res.send({ code: 0, msg: '删除成功' })
}