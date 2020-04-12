// 控制器，暴露一系列中间件方法给到帖子的路由去使用

// 引入 帖子模型
const PostModel = require('../models/PostModel')

// 查询帖子
exports.index = async (req, res) => {
  // try {
  //   const data =  await PostModel.find()
  //   res.send({code: 0, msg: '查询成功', data})
  // } catch (error) {
  //   console.log(error);
  //   res.send({code: -1, msg: '查询失败'})
  // }
  const data = await PostModel.find()
  res.send({ code: 0, msg: '查询成功', data })
}

//创建
exports.create = async (req, res) => {
  // 获取 用户传来的 请求体
  const { title, content } = req.body

  // PostModel
  //   .create({ title, content })
  //   .then(() => {
  //     res.send({
  //       code: 0,
  //       msg: '成功'
  //     })
  //   })
  //   .catch((err)=> {
  //     console.log(err);
  //     res.send({
  //       code: -1,
  //       msg: '失败'
  //     })
  //   })

  await PostModel.create({ title, content })
  res.send({ code: 0, msg: '创建成功' })
}

//更新
exports.update = async (req, res) => {
  // 获取 更新的帖子 id
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