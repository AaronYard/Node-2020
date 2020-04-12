// 帖子模型文件
// 引入连接了数据库的 mongoose
const mongoose = require('../config/db')

// 定义 schema （一些属性）
const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true }
  },
  // timestamps: true, 会多出两个字段 createdAt   updatedAt
  {
    timestamps: true
  }
)

// 创建模型(类/构造函数--大写)   (post: 集合/表名的单数）
const PostModel = mongoose.model('post', postSchema)

// 导出模型
module.exports = PostModel
