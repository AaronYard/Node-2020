// 帖子模型文件
// 引入连接了数据库的 mongoose
const mongoose = require('../config/db')

// 定义 schema （一些属性）
const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    /**
     * 用户Id, 关联的是 users 集合(表 / 模型)
     * type: 固定为 mongodb中 _id 的 ObjectId  
     *      mongoose.Schema.Types.ObjectId 或 mongoose.SchemaTypes.ObjectId、
     * ref: 关联的模型，也就是 mogoose.model() 时传递的第一个参数
     */
    userId: { type: mongoose.SchemaTypes.ObjectId, ref: 'user', required: true}
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
