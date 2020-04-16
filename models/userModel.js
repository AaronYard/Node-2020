// 引入连接了数据库的 mongoose
const mongoose = require('../config/db')

const bcryptjs = require("bcryptjs")   // 密码加密

// 表结构
const userSchema = new mongoose.Schema({
  // 邮箱验证
  email: {
    type: String, required: true, validate: {
      validator: function (v) {
        return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(v);
      },
      message: '请输入正确的邮箱'
    }
  },
  password: { type: String, required: true },
  nickname: { type: String, default: '' },
  avatar: { type: String, default: 'http://localhost:3000/assets/img/avatar.png'}
}, {
  timestamps: true
})

// 钩子函数（在特定时候自动执行），在 UserModel.create()新建数据的时候会执行回调函数，
// 这里的回调函数不能写成 箭头函数， 这里函数中的this指向的是 当前创建的文档（数据）
userSchema.pre('save', function(next) {
  this.password = bcryptjs.hashSync(this.password, 10)
  next()   // 这个不能少
})

// 给 UserModel 的实例(一条数据)，添加一个实例方法（检验登录密码）,在 登录时调用
userSchema.methods.comparePassword = function(password) {
  // bcryptjs.compareSync(原密码, 已经加密的密码), 返回一个 Boolean 值, 
  // this 指向的是这个实例（这条数据）
  return bcryptjs.compareSync(password, this.password)
}

// 模型
const UserModel = mongoose.model('user', userSchema)

// 导出模型
module.exports = UserModel